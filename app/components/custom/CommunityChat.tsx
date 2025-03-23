"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Pusher from "pusher-js";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Paperclip, Send, Users, Pin, MessageSquare, X, Trash2, MoreVertical, ZoomIn, ZoomOut, Search, Image as ImageIcon, Link, Loader2, Info, Eye } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatDistanceToNow, format } from "date-fns";

// Types
type User = { id: number; email: string; name: string | null; avatar: string | null; maxPhone: number; maxPC: number; sessions: SessionPoint[]; role: "user" | "admin"; isOnline: boolean };
type SessionPoint = { id: number; createdAt: string; lastActiveAt: string; expiresAt: string };
type Message = {
  id: number;
  userId: number;
  content: string;
  imageUrls: string[];
  createdAt: string;
  reactions: { id: number; userId: number; emoji: string; user: { id: number; name: string | null; avatar: string | null } }[];
  replyToId?: number;
  isPinned: boolean;
  isDeleted: boolean;
  seenBy: { userId: number; user: { id: number; name: string | null; avatar: string | null } }[];
  user: { id: number; name: string | null; avatar: string | null };
};

export default function CommunityChat() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewContents, setPreviewContents] = useState<string[]>([]);
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [showReactions, setShowReactions] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [highlightedMessage, setHighlightedMessage] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [filterMode, setFilterMode] = useState<"all" | "images" | "links">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [typingUsers, setTypingUsers] = useState<Set<number>>(new Set());
  const [showInfoDialog, setShowInfoDialog] = useState<Message | null>(null);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentUserId = Number(session?.user?.id);
  const isAdmin = session?.user?.role === "admin";
  const canSend = (newMessage.trim() || selectedFiles.length > 0) && !isSending;

  // Pusher setup và fetch dữ liệu
  useEffect(() => {
    if (!session) {
      setMessages([]);
      setIsLoading(false);
      return;
    }

    const fetchUsers = async () => {
      const res = await fetch("/api/community-chatapp/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      } else {
        console.error("Failed to fetch users:", await res.text());
      }
    };

    const fetchMessages = async () => {
      const res = await fetch("/api/community-chatapp/messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
        setIsLoading(false);
      } else {
        console.error("Failed to fetch messages:", await res.text());
        setMessages([]);
        setIsLoading(false);
      }
    };

    fetchUsers();
    fetchMessages();

    const notifyOnline = async () => {
      await fetch("/api/community-chatapp/online", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUserId }),
        credentials: "include",
      });
    };
    notifyOnline();

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      authEndpoint: "/api/community-chatapp/auth",
    });

    const channel = pusher.subscribe("community-chat");
    channel.bind("new-message", (data: Message) => setMessages((prev) => [...prev, data]));
    channel.bind("update-message", (data: Message) => setMessages((prev) => prev.map((m) => (m.id === data.id ? data : m))));
    channel.bind("new-reaction", (data: Message) => setMessages((prev) => prev.map((m) => (m.id === data.id ? data : m))));
    channel.bind("message-seen", (data: Message) => setMessages((prev) => prev.map((m) => (m.id === data.id ? data : m))));
    channel.bind("typing", (data: { userId: number }) => {
      if (data.userId !== currentUserId) {
        setTypingUsers((prev) => new Set(prev).add(data.userId));
        setTimeout(() => setTypingUsers((prev) => {
          const newSet = new Set(prev);
          newSet.delete(data.userId);
          return newSet;
        }), 2000);
      }
    });
    channel.bind("user-status", (data: { userId: number; isOnline: boolean }) => {
      setUsers((prev) => prev.map((u) => (u.id === data.userId ? { ...u, isOnline: data.isOnline } : u)));
    });

    const handleBeforeUnload = () => {
      navigator.sendBeacon("/api/community-chatapp/offline", JSON.stringify({ userId: currentUserId }));
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [session, currentUserId]);

  // Điều chỉnh chiều cao chat
  useEffect(() => {
    const updateHeight = () => {
      if (chatContainerRef.current && scrollAreaRef.current) {
        const height = chatContainerRef.current.clientHeight - 216;
        scrollAreaRef.current.style.height = `${height}px`;
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [messages.length]);

  // Tự động scroll khi messages hoặc typingUsers thay đổi
  useEffect(() => {
    if (scrollAreaRef.current) {
      const { scrollHeight, clientHeight, scrollTop } = scrollAreaRef.current;
      // Scroll xuống dưới cùng nếu gần cuối hoặc có tin nhắn mới từ người dùng hiện tại
      if (scrollHeight - scrollTop - clientHeight < 100 || messages[messages.length - 1]?.userId === currentUserId) {
        scrollAreaRef.current.scrollTo({ top: scrollHeight, behavior: "smooth" });
      }
    }
  }, [messages, typingUsers, currentUserId]);

  // Đóng menu khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setShowMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Ghi lại hành động "seen" khi gửi reply
  const markAsSeen = async (messageId: number) => {
    try {
      const res = await fetch("/api/community-chatapp/seen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageId }),
        credentials: "include",
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error(`Failed to mark as seen (status ${res.status}):`, errorText || "No error message returned");
      }
    } catch (error) {
      console.error("Error in markAsSeen:", error);
    }
  };

  // Tự động mark as seen khi tin nhắn hiển thị
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            const messageId = Number(entry.target.getAttribute("data-message-id"));
            const msg = messages.find((m) => m.id === messageId);
            if (msg && !msg.isDeleted && !msg.seenBy.some((s) => s.userId === currentUserId)) {
              await markAsSeen(messageId);
            }
          }
        });
      },
      { root: scrollAreaRef.current, threshold: 0.5 }
    );

    messageRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [messages, currentUserId]);

  // Gửi tin nhắn cộng đồng
  const handleSendMessage = async () => {
    if (!canSend || !currentUserId) return;
    setIsSending(true);

    const formData = new FormData();
    formData.append("content", newMessage.trim());
    if (replyTo?.id) {
      formData.append("replyToId", replyTo.id.toString());
      await markAsSeen(replyTo.id);
    }
    selectedFiles.forEach((file) => formData.append("images", file));

    const res = await fetch("/api/community-chatapp/messages", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (res.ok) {
      setNewMessage("");
      setSelectedFiles([]);
      setPreviewContents([]);
      setReplyTo(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      // Scroll xuống dưới cùng ngay sau khi gửi
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: "smooth" });
      }
    } else {
      console.error("Failed to send message:", await res.text());
    }
    setIsSending(false);
  };

  // Xử lý file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter((file) => file.type.startsWith("image/"));
      if (files.length) {
        setSelectedFiles(files);
        setPreviewContents(files.map((file) => URL.createObjectURL(file)));
        inputRef.current?.focus();
      }
    }
  };



  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) {
          setSelectedFiles((prev) => [...prev, file]);
          setPreviewContents((prev) => [...prev, URL.createObjectURL(file)]);
          inputRef.current?.focus();
          e.preventDefault();
        }
      } else if (item.type === "text/plain") {
        item.getAsString((text) => setNewMessage((prev) => prev + text));
      }
    }
  };

  const lastTypingSent = useRef<number>(0); // Lưu timestamp lần gửi typing cuối
  const TYPING_INTERVAL = 1000; // Gửi typing mỗi 300ms nếu cần
  
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setNewMessage(value);
  
      if (currentUserId) {
        const now = Date.now();
        // Chỉ gửi typing nếu đã qua 300ms kể từ lần gửi cuối
        if (now - lastTypingSent.current >= TYPING_INTERVAL) {
          fetch("/api/community-chatapp/typing", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: currentUserId }),
            credentials: "include",
          }).catch((error) => {
            console.error("Failed to notify typing:", error);
          });
          lastTypingSent.current = now; // Cập nhật thời gian gửi cuối
        }
  
        // Xử lý timeout cho typingUsers
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
          setTypingUsers((prev) => {
            const newSet = new Set(prev);
            newSet.delete(currentUserId);
            return newSet;
          });
        }, 2000);
      }
    },
    [currentUserId, setNewMessage] // Dependencies
  );

  // Xử lý zoom và drag ảnh
  const handleWheelZoom = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    setZoomLevel((prev) => Math.max(0.5, Math.min(prev + (e.deltaY < 0 ? 0.1 : -0.1), 3)));
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.1, 3));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.1, 0.5));

  const handleTouchStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    setStartPos({ x: clientX - position.x, y: clientY - position.y });
  };

  const handleTouchMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const maxMove = 200 * (zoomLevel - 1);
    setPosition({
      x: Math.max(-maxMove, Math.min(maxMove, clientX - startPos.x)),
      y: Math.max(-maxMove, Math.min(maxMove, clientY - startPos.y)),
    });
  };

  const handleTouchEnd = () => setIsDragging(false);

  // Xử lý reaction
  const handleReaction = async (messageId: number, emoji: string) => {
    const res = await fetch("/api/community-chatapp/reactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messageId, emoji }),
      credentials: "include",
    });

    if (res.ok) {
      setShowReactions(null);
    } else {
      console.error("Failed to add reaction:", await res.text());
    }
  };

  const handleReply = (msg: Message) => {
    setReplyTo(msg);
    inputRef.current?.focus();
  };

  const handlePinMessage = async (messageId: number) => {
    if (!isAdmin) return;
    const message = messages.find((m) => m.id === messageId);
    if (!message) return;

    const res = await fetch(`/api/community-chatapp/messages/${messageId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: messageId, isPinned: !message.isPinned }),
      credentials: "include",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Failed to pin message (status ${res.status}):`, errorText || "No response body");
    }
  };

  const handleDeleteMessage = async (messageId: number) => {
    if (!isAdmin) return;
    const res = await fetch(`/api/community-chatapp/messages/${messageId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: messageId, isDeleted: true }),
      credentials: "include",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Failed to delete message (status ${res.status}):`, errorText || "No response body");
    }
  };

  const handleScrollToMessage = (messageId: number) => {
    const target = messageRefs.current.get(messageId);
    if (target && scrollAreaRef.current) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      setHighlightedMessage(messageId);
      setTimeout(() => setHighlightedMessage(null), 2000);
    }
  };

  const handleAboutMessage = (msg: Message) => {
    setShowInfoDialog(msg);
    setShowReactions(null);
  };

  const toggleMenu = (messageId: number) => setShowReactions(showReactions === messageId ? null : messageId);
  const toggleHeaderMenu = () => setShowMenu((prev) => !prev);
  const handleSearch = () => {
    setActiveSearch(searchQuery);
    setShowMenu(false);
  };

  const filteredMessages = messages.filter((msg) => {
    if (activeSearch && !msg.content.toLowerCase().includes(activeSearch.toLowerCase())) return false;
    if (filterMode === "images") return msg.imageUrls.length > 0 && !msg.isDeleted;
    if (filterMode === "links") return msg.content.includes("http") && !msg.isDeleted;
    return true;
  });

  const pinnedMessages = messages.filter((msg) => msg.isPinned && !msg.isDeleted);

  const getMessageTime = (createdAt: string) => {
    const now = new Date();
    const messageDate = new Date(createdAt);
    const diffInDays = (now.getTime() - messageDate.getTime()) / (1000 * 3600 * 24);
    return diffInDays > 3 ? format(messageDate, "dd/MM/yyyy HH:mm") : formatDistanceToNow(messageDate, { addSuffix: true });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLParagraphElement>, content: string) => {
    if (e.ctrlKey) {
      const urlMatch = content.match(/(https?:\/\/[^\s]+)/);
      if (urlMatch) {
        window.open(urlMatch[0], "_blank");
        e.preventDefault();
      }
    }
  };

  const isUserOnline = (user: User) => user.isOnline;

  return (
    <div className="h-full flex flex-col md:flex-row gap-4 p-4 bg-gray-100 font-['Inter']" ref={chatContainerRef}>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden flex-1 flex flex-col">
        <div className="p-4 border-b bg-gray-50 flex items-center justify-between chat-header">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-gray-600" />
            <h2 className="text-base font-medium text-gray-700">Community Chat</h2>
          </div>
          <div className="relative" ref={menuRef}>
            <Button variant="ghost" size="sm" onClick={toggleHeaderMenu} className="text-gray-600 hover:bg-gray-200">
              <MoreVertical className="h-5 w-5" />
            </Button>
            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-1 w-52 bg-white border border-gray-200 rounded-md shadow-md z-10"
                >
                  <div className="p-2">
                    <div className="flex items-center gap-1 mb-1">
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        className="w-full text-sm border-gray-300 focus:border-blue-500"
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      />
                      <Button variant="ghost" size="sm" onClick={handleSearch} className="text-blue-500 hover:bg-blue-100">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-blue-500 hover:bg-blue-100 text-sm" onClick={() => { setFilterMode("images"); setShowMenu(false); }}>
                      <ImageIcon className="h-4 w-4 mr-1" /> Only Images
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-blue-500 hover:bg-blue-100 text-sm" onClick={() => { setFilterMode("links"); setShowMenu(false); }}>
                      <Link className="h-4 w-4 mr-1" /> Only Links
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-blue-500 hover:bg-blue-100 text-sm" onClick={() => { setFilterMode("all"); setSearchQuery(""); setActiveSearch(""); setShowMenu(false); }}>
                      <Eye className="h-4 w-4 mr-1" /> Show All
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {pinnedMessages.length > 0 && (
          <div className="p-1 bg-gray-50 border-b pinned-messages">
            {pinnedMessages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-1 text-sm text-blue-500 cursor-pointer p-1 rounded"
                onClick={() => handleScrollToMessage(msg.id)}
              >
                <Pin className="h-4 w-4 shrink-0" />
                <div className="flex items-center gap-1 group hover:bg-blue-100 transition-colors duration-200 rounded-lg"> {/* Thêm rounded-lg */}
                  <span className="truncate flex-1">{msg.content ? `${msg.content.slice(0, 48)}...` : `${msg.imageUrls.length} ảnh`}</span>
                  {isAdmin && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-5 w-5 text-blue-500 hover:text-blue-700 hover:bg-blue-200 rounded-full transition-colors duration-200"
                      onClick={(e) => { e.stopPropagation(); handlePinMessage(msg.id); }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="overflow-y-auto p-2 flex-1 bg-white" ref={scrollAreaRef}>
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="h-7 w-7 animate-spin text-blue-500" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex justify-center items-center h-full text-gray-500">
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            <AnimatePresence>
              {filteredMessages.map((msg) => {
                const isCurrentUser = msg.userId === currentUserId;
                const replyMsg = msg.replyToId ? messages.find((m) => m.id === msg.replyToId) : null;
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    ref={(el) => { if (el) messageRefs.current.set(msg.id, el); }}
                    className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} ${highlightedMessage === msg.id ? "bg-yellow-50" : ""} mb-2`}
                    data-message-id={msg.id}
                  >
                    <div className={`flex items-start gap-2 max-w-[65%] ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}>
                      <Avatar>
                        <AvatarImage src={msg.user.avatar ?? "https://picsum.photos/150"} />
                        <AvatarFallback>{msg.user.name?.[0] || "U"}</AvatarFallback>
                      </Avatar>
                      <div className="relative">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <span>{msg.user.name || "Unknown"} • {getMessageTime(msg.createdAt)}</span>
                          {!msg.isDeleted && (
                            <Button variant="ghost" size="sm" className="p-0 h-5 w-5 hover:bg-gray-200" onClick={() => toggleMenu(msg.id)}>
                              <MoreVertical className="h-4 w-4 text-gray-600" />
                            </Button>
                          )}
                        </div>
                        {replyMsg && (
                          <div
                            className="text-xs text-gray-400 bg-gray-100 p-1 rounded mb-1 cursor-pointer hover:bg-gray-200"
                            onClick={() => handleScrollToMessage(msg.replyToId!)}
                          >
                            {replyMsg.user.name || "Unknown"}: {replyMsg.content.slice(0, 36)}...
                          </div>
                        )}
                        <div
                          className={`p-2 rounded-md text-sm shadow-sm ${msg.isDeleted
                            ? "bg-gray-100 text-gray-400 italic"
                            : isCurrentUser
                              ? "bg-blue-500 text-white"
                              : "bg-gray-50 text-gray-800 border border-gray-200"
                            }`}
                        >
                          {msg.isDeleted ? (
                            <p>Message has been deleted by admin</p>
                          ) : (
                            <>
                              {msg.content && (
                                <p onClick={(e) => handleLinkClick(e, msg.content)} className="cursor-pointer">
                                  {msg.content}
                                </p>
                              )}
                              {Array.isArray(msg.imageUrls) && msg.imageUrls.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {msg.imageUrls.map((url, index) => (
                                    <Image
                                      key={index}
                                      src={url}
                                      alt={`Uploaded ${index}`}
                                      width={96}
                                      height={96}
                                      className="max-w-[96px] max-h-[96px] rounded cursor-pointer object-cover hover:opacity-80 transition-opacity"
                                      onClick={() => setSelectedImage(url)}
                                    />
                                  ))}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                        <div className="flex gap-1 mt-1">
                          {Object.entries(
                            msg.reactions.reduce((acc, r) => {
                              acc[r.emoji] = (acc[r.emoji] || 0) + 1;
                              return acc;
                            }, {} as Record<string, number>)
                          ).map(([emoji, count]) => (
                            <Badge
                              key={emoji}
                              variant="outline"
                              className="text-xs cursor-pointer bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                              onClick={() => !msg.isDeleted && handleReaction(msg.id, emoji)}
                            >
                              {emoji} {count}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {msg.seenBy
                            .filter((seen) => seen.userId !== currentUserId)
                            .slice(0, 3)
                            .map((seen) => (
                              <Avatar key={seen.userId} className="h-5 w-5">
                                <AvatarImage src={seen.user?.avatar ?? "https://picsum.photos/150"} />
                                <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                                  {seen.user?.name?.[0] || "U"}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                          {msg.seenBy.length > 3 && (
                            <span className="text-xs text-gray-500">+{msg.seenBy.length - 3}</span>
                          )}
                        </div>
                        <AnimatePresence>
                          {showReactions === msg.id && !msg.isDeleted && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              className="absolute right-0 bg-white border border-gray-200 rounded-md p-1 shadow-md z-10"
                              style={{ top: msg.id === 1 ? "36px" : "-36px" }}
                            >
                              <div className="flex gap-1">
                                {["👍", "❤️", "😂", "😢", "😡"].map((emoji) => (
                                  <Button
                                    key={emoji}
                                    variant="ghost"
                                    size="sm"
                                    className="p-0 h-6 w-6 hover:bg-blue-100"
                                    onClick={() => handleReaction(msg.id, emoji)}
                                  >
                                    {emoji}
                                  </Button>
                                ))}
                                <Button variant="ghost" size="sm" className="p-0 h-6 w-6 hover:bg-blue-100" onClick={() => handleReply(msg)}>
                                  <MessageSquare className="h-4 w-4 text-blue-500" />
                                </Button>
                                {isAdmin && (
                                  <>
                                    <Button variant="ghost" size="sm" className="p-0 h-6 w-6 hover:bg-blue-100" onClick={() => handlePinMessage(msg.id)}>
                                      <Pin className="h-4 w-4 text-blue-500" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="p-0 h-6 w-6 hover:bg-red-100" onClick={() => handleDeleteMessage(msg.id)}>
                                      <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                  </>
                                )}
                                <Button variant="ghost" size="sm" className="p-0 h-6 w-6 hover:bg-blue-100" onClick={() => handleAboutMessage(msg)}>
                                  <Info className="h-4 w-4 text-blue-500" />
                                </Button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              {typingUsers.size > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-start mb-2"
                >
                  <div className="flex items-start gap-2 max-w-[65%]">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-gray-200 text-gray-600 text-sm">...</AvatarFallback>
                    </Avatar>
                    <div className="p-2 rounded-md text-sm bg-gray-100 text-gray-500 flex items-center gap-1">
                      <span className="animate-pulse">Đang nhập...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
            onWheel={handleWheelZoom}
          >
            <div
              className="relative"
              onClick={(e) => e.stopPropagation()}
              onMouseDown={handleTouchStart}
              onMouseMove={handleTouchMove}
              onMouseUp={handleTouchEnd}
              onMouseLeave={handleTouchEnd}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ cursor: zoomLevel > 1 ? "grab" : "default" }}
            >
              <Image
                src={selectedImage}
                alt="Zoomed"
                width={960}
                height={960}
                className="max-w-[90vw] max-h-[90vh] rounded-md object-contain"
                style={{ transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`, transition: isDragging ? "none" : "transform 0.2s ease" }}
              />
              <div className="absolute top-2 right-2 flex gap-1">
                <Button variant="outline" size="sm" className="bg-white text-blue-500 hover:bg-blue-100 h-7" onClick={handleZoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="bg-white text-blue-500 hover:bg-blue-100 h-7" onClick={handleZoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="bg-white text-blue-500 hover:bg-blue-100 h-7" onClick={() => { setSelectedImage(null); setZoomLevel(1); setPosition({ x: 0, y: 0 }); }}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        <Dialog open={!!showInfoDialog} onOpenChange={() => setShowInfoDialog(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-base">Message Info</DialogTitle>
            </DialogHeader>
            {showInfoDialog && (
              <div className="text-sm text-gray-700">
                <p>ID: {showInfoDialog.id}</p>
                <p>User: {showInfoDialog.user?.name || "Unknown"}</p>
                <p>Sent: {format(new Date(showInfoDialog.createdAt), "dd/MM/yyyy HH:mm:ss")}</p>
                <p>Seen by: {showInfoDialog.seenBy.length > 0 ? showInfoDialog.seenBy.map((seen) => seen.user?.name || "Unknown").join(", ") : "No one"}</p>
                <p>Reactions: {showInfoDialog.reactions.length > 0 ? showInfoDialog.reactions.map((r) => `${r.emoji} by ${r.user?.name || "Unknown"}`).join(", ") : "None"}</p>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <div className="p-4 border-t bg-white chat-input relative">
          {replyTo && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-gray-500 mb-1 flex items-center gap-1">
              Replying to {replyTo.user.name || "Unknown"}: {replyTo.content.slice(0, 36)}...
              <Button variant="ghost" size="sm" className="p-0 h-5 w-5 hover:bg-gray-200" onClick={() => setReplyTo(null)}>
                <X className="h-4 w-4 text-gray-600" />
              </Button>
            </motion.div>
          )}
          {previewContents.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-1 flex flex-wrap gap-1">
              {previewContents.map((url, index) => (
                <div key={index} className="relative">
                  <Image
                    src={url}
                    alt={`Preview ${index}`}
                    width={72}
                    height={72}
                    className="w-[72px] h-[72px] rounded object-cover cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedImage(url)}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-0 right-0 p-0 h-5 w-5 hover:bg-gray-200"
                    onClick={() => {
                      setPreviewContents((prev) => prev.filter((_, i) => i !== index));
                      setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
                    }}
                  >
                    <X className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>
              ))}
            </motion.div>
          )}
          <div className="flex gap-1 relative">
            <Button variant="ghost" size="sm" className="p-1 text-gray-600 hover:bg-gray-200" onClick={() => fileInputRef.current?.click()}>
              <Paperclip className="h-4 w-4" />
            </Button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" multiple className="hidden" />
            <Input
              ref={inputRef}
              value={newMessage}
              onChange={handleInputChange}
              onPaste={handlePaste}
              placeholder="Type a message..."
              className="flex-1 text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10"
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!canSend}
              className={`flex items-center gap-1 transition-colors duration-200 h-10 text-sm ${canSend ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
            >
              {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Send
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex items-center gap-2">
          <Users className="h-5 w-5 text-gray-600" />
          <h2 className="text-base font-medium text-gray-700">Members ({users.filter(isUserOnline).length})</h2>
        </div>
        <div className="overflow-y-auto p-2 user-list">
          {users.map((user) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded shadow-sm hover:bg-gray-50 transition-colors"
            >
              <div className="relative">
                <Avatar>
                  <AvatarImage src={user.avatar ?? "https://picsum.photos/150"} />
                  <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
                </Avatar>
                <span className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-white ${isUserOnline(user) ? "bg-green-500" : "bg-red-500"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-800 truncate">{user.name || "Unnamed"}</div>
                <div className="text-xs text-gray-500 truncate">{user.email}</div>
                <div className="text-xs text-gray-400">Joined {formatDistanceToNow(new Date(user.sessions[0]?.createdAt || new Date()), { addSuffix: true })}</div>
              </div>
              <Badge variant="outline" className="text-xs shrink-0 bg-gray-50 text-gray-600 border-gray-200">{user.maxPhone}P / {user.maxPC}PC</Badge>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
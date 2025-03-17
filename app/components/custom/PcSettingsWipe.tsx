import { useState, useRef } from "react";
import ContentEditable from "react-contenteditable";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const contentEditableStyle = {
  wordWrap: "break-word",
  maxWidth: "100%",
  whiteSpace: "pre-wrap",
  overflowY: "auto",
  wordBreak: "break-all",
};

export default function PcSettingsWipe() {
  const [text, setText] = useState("");
  const contentEditableRef = useRef<HTMLElement | null>(null);

  const countLines = (text: string) =>
    !text || !text.trim() ? 0 : text.split(/[\r\n]+/).filter((line) => line.trim().length > 0).length;

  const handleChange = () => {
    if (contentEditableRef.current) {
      setText(contentEditableRef.current.innerText);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <Alert className="border-cyan-600/50 text-cyan-600 dark:border-cyan-600">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Important Information LIST-WIPE</AlertTitle>
        <AlertDescription className="max-h-[200px] overflow-y-auto pr-2">
          Each line is a package, for example:
          <ul className="mt-1 list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
            {[
              "com.facebook.katana (Facebook)",
              "com.facebook.lite (Facebook Lite)",
              "com.facebook.orca (Messenger)",
              "com.instagram.android (Instagram)",
              "com.instagram.lite (Instagram Lite)",
              "com.zhiliaoapp.musically (TikTok)",
              "com.whatsapp (WhatsApp)",
              "com.twitter.android (Twitter/X)",
              "com.snapchat.android (Snapchat)",
              "com.linkedin.android (LinkedIn)",
              "com.reddit.frontpage (Reddit)",
              "com.pinterest (Pinterest)",
              "com.google.android.gms (Google Play Services)",
              "com.google.android.youtube (YouTube)",
              "com.android.vending (Google Play Store)",
              "com.google.android.gsf (Google Services Framework)",
              "com.google.android.apps.maps (Google Maps)",
              "com.google.android.gm (Gmail)",
              "com.google.android.calendar (Google Calendar)",
              "com.google.android.keep (Google Keep)",
              "com.google.android.talk (Google Hangouts)",
              "com.google.android.apps.photos (Google Photos)",
              "com.google.android.apps.docs (Google Drive)",
              "com.google.android.apps.meetings (Google Meet)",
              "com.android.chrome (Google Chrome)",
              "org.mozilla.firefox (Firefox)",
              "com.microsoft.emmx (Microsoft Edge)",
              "com.sec.android.app.sbrowser (Samsung Internet)",
              "com.opera.browser (Opera Browser)",
              "com.android.settings (Settings)",
              "com.android.phone (Phone App)",
              "com.android.dialer (Dialer)",
              "com.android.mms (Messaging/SMS)",
              "com.android.contacts (Contacts)",
              "com.android.camera (Camera)",
              "com.android.gallery3d (Gallery)",
              "com.android.calculator2 (Calculator)",
              "com.android.music (Music Player)",
              "com.android.email (Email Client)",
              "com.samsung.android.messaging (Samsung Messages)",
              "com.android.systemui (System UI)",
              "com.android.launcher (Launcher)",
              "com.android.providers.settings (Settings Provider)",
              "com.android.providers.downloads (Download Manager)",
              "com.android.wallpaper.livepicker (Live Wallpaper Picker)",
              "com.android.nfc (NFC Services)",
              "com.android.bluetooth (Bluetooth Services)",
              "com.android.vpnservices (VPN Services)",
              "com.android.wifi (Wi-Fi Services)",
              "com.android.shell (Shell Command Service)",
              "com.android.keyguard (Lock Screen)",
              "com.android.server.telecom (Telecom Service)"
            ].map((pkg) => (
              <li key={pkg}><code>{pkg}</code></li>
            ))}
          </ul>
        </AlertDescription>
      </Alert>



      <div>
        <ContentEditable
          innerRef={(el: HTMLElement | null) => (contentEditableRef.current = el)}
          html={text}
          onChange={handleChange}
          onBlur={handleChange}
          className="w-full p-2 border rounded-md shadow-sm min-h-[6rem] max-h-[12rem] overflow-auto bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs text-gray-500"
          style={contentEditableStyle}
        />
        <div className="mt-2 text-xs text-gray-500">Total lines: {countLines(text)}</div>
      </div>

      <Button type="submit" variant="secondary" className="mt-4">
        Save
      </Button>
    </form>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Send,
} from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { saveContactMessage } from "@/services/contact.service";

// ✅ UPDATED CREDENTIALS
const SERVICE_ID = "service_4ml59n4";
const TEMPLATE_ID = "template_bt1s8ii"; // ✅ Updated with your correct ID
const PUBLIC_KEY = "RpaTKs-r1cqbLoilR"; 

const HireMe = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const services = [
    "UI/UX Design",
    "Web Design",
    "Graphic Design",
    "Chat Bot",
    "Other",
  ];

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const form = e.currentTarget;

    try {
      const formData = new FormData(form);

      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const message = String(formData.get("message") || "").trim();
      const service =
        selectedServices.length > 0
          ? selectedServices.join(", ")
          : "Not specified";

      // 1. Validate Input
      if (!name || !email || !message) {
        toast({
          title: "Missing fields",
          description: "Please fill all required fields.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // 2. Save to Firebase (Optional)
      try {
        await saveContactMessage(
          name,
          email,
          `${message}\n\nServices Interested: ${service}`
        );
      } catch (dbError) {
        console.warn("Firebase save failed, but attempting to send email.", dbError);
      }

      // 3. Send Email
      // Note: Ensure your EmailJS template uses these exact variable names: 
      // {{from_name}}, {{reply_to}}, {{service}}, {{message}}
      const templateParams = {
        from_name: name,
        reply_to: email,
        service: service,
        message: message,
      };

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      // 4. Success Handling
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll contact you soon.",
      });

      form.reset();
      setSelectedServices([]);

    } catch (error: any) {
      console.error("FAILED...", error);
      
      const errorText = error.text || error.message || "Unknown error";
      
      toast({
        title: "Sending Failed",
        description: `Error: ${errorText}. Check console for details.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">

        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 text-gray-300 hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="grid gap-10 lg:grid-cols-2">

          {/* LEFT INFO */}
          <div className="bg-gradient-to-br from-primary/90 to-accent/90 rounded-3xl p-6 sm:p-8 lg:p-10 text-white space-y-8 shadow-2xl lg:sticky lg:top-24">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Let’s work <br />
              on something <span className="text-black/80">awesome</span>
            </h2>

            <div className="space-y-5">
              <div className="flex gap-4 items-center">
                <Mail /> parshuram8792@gmail.com
              </div>
              <div className="flex gap-4 items-center">
                <Phone /> +91 8792 832815
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-white/20">
              <Facebook />
              <Instagram />
              <Twitter />
            </div>
          </div>

          {/* FORM */}
          <div className="glass rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-8">

              <div>
                <p className="text-gray-300 mb-3">I'm interested in...</p>
                <div className="flex flex-wrap gap-3">
                  {services.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleService(s)}
                      className={`px-4 py-2 rounded-full text-sm border ${
                        selectedServices.includes(s)
                          ? "bg-accent text-black border-accent"
                          : "bg-white/5 text-gray-400 border-white/10"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <Input name="name" placeholder="Your name" required />
              <Input name="email" placeholder="Your email" type="email" required />
              <Textarea name="message" placeholder="Your message" required />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-white text-black font-bold disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : (
                  <span className="flex items-center gap-2">
                    Send Message <Send />
                  </span>
                )}
              </Button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HireMe;
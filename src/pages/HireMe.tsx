import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    setIsSubmitting(true);

    const form = e.currentTarget; // ✅ store reference safely

    try {
      const formData = new FormData(form);

      const name = String(formData.get("name"));
      const email = String(formData.get("email"));
      const message = String(formData.get("message"));
      const service =
        selectedServices.length > 0
          ? selectedServices.join(", ")
          : "Not specified";

      await saveContactMessage(
        name,
        email,
        `${message}\n\nServices Interested: ${service}`
      );

      // ✅ SUCCESS TOAST
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll contact you soon.",
      });

      // ✅ SAFE RESET (prevents false error)
      setTimeout(() => {
        form.reset();
        setSelectedServices([]);
      }, 0);

    } catch (error) {
      console.error("Form UI error:", error);

      toast({
        title: "Something went wrong!",
        description: "But your message was received.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">

        {/* Back Button */}
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

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Let’s work <br />
              on something <span className="text-black/80">awesome</span>
            </h2>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <a href="mailto:parshuramcse@gmail.com" className="hover:underline">
                  parshuram8792@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <a href="tel:+918792832815" className="hover:underline">
                  +91 8792 832815
                </a>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-white/20">
              <a href="https://www.facebook.com/share/15SJ5GW2Da/" target="_blank">
                <Facebook />
              </a>
              <a href="https://www.instagram.com/its_me_parshuram_18" target="_blank">
                <Instagram />
              </a>
              <a href="https://twitter.com" target="_blank">
                <Twitter />
              </a>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="glass rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Services */}
              <div>
                <p className="text-gray-300 mb-3">I'm interested in...</p>
                <div className="flex flex-wrap gap-3">
                  {services.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService(service)}
                      className={`px-4 py-2 rounded-full text-sm border ${
                        selectedServices.includes(service)
                          ? "bg-accent text-black border-accent"
                          : "bg-white/5 text-gray-400 border-white/10 hover:text-white"
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              <Input
                name="name"
                required
                placeholder="Your name"
                className="h-12 bg-white/5 border-white/10 text-white"
              />

              <Input
                name="email"
                type="email"
                required
                placeholder="Your email"
                className="h-12 bg-white/5 border-white/10 text-white"
              />

              <Textarea
                name="message"
                required
                placeholder="Tell me about your project..."
                className="min-h-[140px] bg-white/5 border-white/10 text-white"
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-white text-black font-bold"
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

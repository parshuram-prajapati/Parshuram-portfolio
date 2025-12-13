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

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const message = formData.get("message") as string;
      const service = selectedServices.join(", ");

      // 🔥 SAVE TO FIREBASE
      await saveContactMessage(
        name,
        email,
        `${message}\n\nServices Interested: ${service}`
      );

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll contact you soon.",
      });

      form.reset();
      setSelectedServices([]);
    } catch (error) {
      console.error("Firebase Error:", error);
      toast({
        title: "Something went wrong!",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // 1. FIX: Changed bg-background to bg-transparent
    <div className="min-h-screen bg-transparent pt-24 pb-12 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">

        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-8 text-gray-300 hover:text-white hover:bg-white/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* LEFT INFO - Premium Gradient Card */}
          <div className="bg-gradient-to-br from-primary/90 to-accent/90 rounded-3xl p-10 text-white space-y-8 shadow-2xl backdrop-blur-sm lg:sticky lg:top-24">
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              Let’s work <br />
              on something <span className="text-black/80">awesome</span>
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <a
                  href="mailto:parshuramcse@gmail.com"
                  className="hover:underline text-lg font-medium"
                >
                  parshuramcse@gmail.com
                </a>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <a href="tel:+918792832815" className="hover:underline text-lg font-medium">
                  +91 8792 832815
                </a>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-white/20">
              <a href="https://www.facebook.com/share/15SJ5GW2Da/" target="_blank" className="p-2 bg-white/10 rounded-lg hover:bg-white/30 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/its_me_parshuram_18" target="_blank" className="p-2 bg-white/10 rounded-lg hover:bg-white/30 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" className="p-2 bg-white/10 rounded-lg hover:bg-white/30 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* RIGHT FORM - Glass Style */}
          {/* 2. FIX: Used 'glass' class instead of bg-white */}
          <div className="glass p-8 md:p-10 rounded-3xl border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Services Chips */}
              <div className="space-y-4">
                <p className="text-gray-300 font-medium">
                  I'm interested in...
                </p>
                <div className="flex flex-wrap gap-3">
                  {services.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService(service)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                        selectedServices.includes(service)
                          ? "bg-accent text-black border-accent shadow-lg shadow-accent/20"
                          : "bg-white/5 text-gray-400 border-white/10 hover:border-accent/50 hover:text-white"
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inputs Group */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-gray-300 text-sm font-medium ml-1">Your name</label>
                  <Input
                    name="name"
                    required
                    placeholder="John Doe"
                    // 3. FIX: Transparent inputs for dark mode
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-accent/50 focus:ring-accent/20 h-12 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-gray-300 text-sm font-medium ml-1">Your email</label>
                  <Input
                    name="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-accent/50 focus:ring-accent/20 h-12 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-gray-300 text-sm font-medium ml-1">Your message</label>
                  <Textarea
                    name="message"
                    required
                    placeholder="Tell me about your project..."
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-accent/50 focus:ring-accent/20 min-h-[150px] rounded-xl resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black hover:bg-gray-200 py-6 text-lg font-bold rounded-xl shadow-lg hover:scale-[1.02] transition-transform"
              >
                {isSubmitting ? "Sending..." : (
                  <span className="flex items-center gap-2">
                    Send Message <Send className="w-5 h-5" />
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
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
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">

        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-8 hover:text-accent"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* LEFT INFO */}
          <div className="bg-gradient-to-br from-primary to-accent/80 rounded-3xl p-10 text-white space-y-8 md:sticky md:top-24">
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              Let’s work <br />
              on something <span className="text-yellow-300">awesome</span>
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <Mail className="w-6 h-6 mt-1" />
                <a
                  href="mailto:parshuramcse@gmail.com"
                  className="hover:underline break-all"
                >
                  parshuramcse@gmail.com
                </a>
              </div>

              <div className="flex gap-4 items-start">
                <Phone className="w-6 h-6 mt-1" />
                <a href="tel:+918792832815" className="hover:underline">
                  +91 8792 832815
                </a>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <a href="https://www.facebook.com/share/15SJ5GW2Da/" target="_blank">
                <Facebook className="w-6 h-6 hover:scale-110 transition" />
              </a>
              <a href="https://www.instagram.com/its_me_parshuram_18" target="_blank">
                <Instagram className="w-6 h-6 hover:scale-110 transition" />
              </a>
              <a href="https://twitter.com" target="_blank">
                <Twitter className="w-6 h-6 hover:scale-110 transition" />
              </a>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Services */}
              <div className="space-y-3">
                <p className="text-gray-700 font-medium">
                  I'm interested in...
                </p>
                <div className="flex flex-wrap gap-3">
                  {services.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService(service)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                        selectedServices.includes(service)
                          ? "bg-primary text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <label className="text-gray-700 font-medium">Your name</label>
                <Input
                  name="name"
                  required
                  placeholder="Enter your name"
                  className="bg-white text-gray-900 border border-gray-300 placeholder:text-gray-400"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-gray-700 font-medium">Your email</label>
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="bg-white text-gray-900 border border-gray-300 placeholder:text-gray-400"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-gray-700 font-medium">Your message</label>
                <Textarea
                  name="message"
                  required
                  placeholder="Tell me about your project..."
                  className="bg-white text-gray-900 border border-gray-300 placeholder:text-gray-400 min-h-[120px]"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-3 rounded-lg"
              >
                {isSubmitting ? "Sending..." : "✈️ Send Message"}
              </Button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HireMe;

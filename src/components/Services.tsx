import { Code, Layout, Shield, Share2 } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Modern, responsive websites using HTML, CSS, JavaScript."
  },
  {
    icon: Layout,
    title: "Front-End Development",
    description: "User-friendly interfaces with latest front-end tech."
  },
  {
    icon: Shield,
    title: "Website Maintenance",
    description: "Ongoing support to keep your site secure and fast."
  },
  {
    icon: Share2,
    title: "Social Media Content",
    description: "Vibrant social media content that tells your story."
  }
];

const Services = () => {
  return (
    // Changed padding for mobile
    <section id="services" className="py-16 md:py-20 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-accent mb-8 md:mb-12 text-center md:text-left">My Services</h2>
        
        {/* Changed grid to single column on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="glass-card p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
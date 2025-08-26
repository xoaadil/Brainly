import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight, BookOpen, Twitter, Youtube, BookmarkPlus, Folders, Smartphone, Search, Link2, Clock, Sparkles, Users, Star } from "lucide-react";
import brain from "../assets/hero-brain.jpg"
import { useNavigate } from "react-router-dom";
// Mock image for hero section

// Utility function for class names
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Button Component with enhanced variants
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gray-900 text-white hover:bg-gray-800 shadow-sm hover:shadow-md",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
        ghost: "hover:bg-gray-100 hover:text-gray-900",
        link: "text-gray-900 underline-offset-4 hover:underline",
        hero: "bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300",
        "hero-outline": "border-2 border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-lg px-10 text-lg font-semibold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

// Enhanced Card Components
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-gray-100 bg-white text-gray-900 shadow-sm hover:shadow-md transition-all duration-300",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-semibold leading-none tracking-tight text-gray-900",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-600 leading-relaxed", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

// Enhanced Hero Component
const Hero = () => {
    let navigate=useNavigate();
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-white via-gray-50 to-indigo-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-gray-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-8 hover:bg-indigo-100 transition-colors duration-200">
              <Sparkles className="h-4 w-4" />
              <span>Your Personal Knowledge Assistant</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-[1.1]">
              Your Second Brain for{" "}
              <span className=" bg-blue-600  bg-clip-text text-transparent">
                Digital Knowledge
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl lg:max-w-none">
              Save, organize, and revisit everything important from YouTube, Twitter, articles, and more. 
              Transform scattered information into your personal knowledge vault.
            </p>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <button
                onClick={() => console.log('Navigate to /signup')}
                className="inline-flex items-center justify-center gap-2 h-14 rounded-lg px-10 text-lg font-semibold bg-gray-900 text-white hover:bg-gray-800 shadow-2xl shadow-gray-900/20 transform hover:scale-[1.02] transition-all duration-300 group"
              > <button onClick={()=>navigate("/signup")}> Get Started Free</button>
               
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button
                onClick={() =>navigate('/login')}
                className="inline-flex items-center justify-center gap-2 h-14 rounded-lg px-10 text-lg font-semibold border-2 border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
              >
                Sign In
              </button>
            </div>
            
            {/* Enhanced Social Proof */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 text-gray-500">
              <div className="flex items-center space-x-2 hover:text-red-500 transition-colors duration-200">
                <Youtube className="h-5 w-5" />
                <span className="text-sm font-medium">YouTube</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-blue-500 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
                <span className="text-sm font-medium">Twitter</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-green-500 transition-colors duration-200">
                <BookOpen className="h-5 w-5" />
                <span className="text-sm font-medium">Articles</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <span className="text-sm">+ More platforms</span>
              </div>
            </div>
          </div>
          
          {/* Enhanced Hero Visual */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-indigo-100 rounded-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300 animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-purple-100 rounded-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300 animate-pulse" style={{ animationDelay: '1s' }}></div>
              
              {/* Main image container */}
              <div className="relative bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-2xl group-hover:shadow-3xl transition-all duration-500 transform group-hover:scale-[1.02]">
                <img
                  src={brain}
                  alt="Digital brain representing organized knowledge"
                  className="relative w-full max-w-md h-auto rounded-xl"
                />
                
                {/* Floating stats */}
                <div className="absolute top-4 right-4 bg-white rounded-lg px-3 py-2 shadow-lg">
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span className="font-medium">10K+ users</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Features Component
const Features = () => {
    let navigate =useNavigate();
  const features = [
    {
      icon: BookmarkPlus,
      title: "One-Click Saving",
      description: "Save content from any website, video, or article instantly. Our smart browser extension captures everything with context.",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Folders,
      title: "Smart Organization",
      description: "AI-powered categorization automatically sorts your content. Create custom collections that grow with your interests.",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Search,
      title: "Intelligent Search",
      description: "Find anything in seconds with semantic search. Search within video transcripts, article content, and your personal notes.",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: Link2,
      title: "Connect Ideas",
      description: "Discover hidden connections between your saved content. Build knowledge graphs that reveal new insights.",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      icon: Smartphone,
      title: "Access Everywhere",
      description: "Your knowledge vault syncs seamlessly across all devices. Native mobile apps keep your brain accessible offline too.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      icon: Clock,
      title: "Smart Reminders",
      description: "Never forget important content again. Intelligent notifications remind you to review based on your learning patterns.",
      color: "text-red-600",
      bgColor: "bg-red-50"
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span>Everything you need</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Knowledge Management
            <span className="block text-indigo-600">Made Simple</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Brainly provides all the tools you need to capture, organize, and retrieve your digital knowledge 
            with the intelligence of modern AI and the simplicity of great design.
          </p>
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 shadow-md overflow-hidden"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl ${feature.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                      {feature.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-gray-600 leading-relaxed text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call-to-action at bottom of features */}
        <div className="text-center mt-16">
          <button
            onClick={() => navigate("/signup") }
            className="inline-flex items-center justify-center gap-2 h-12 rounded-lg px-8 text-base bg-gray-900 text-white hover:bg-gray-800 shadow-lg transform hover:scale-[1.02] transition-all duration-300"
          >
            Start Building Your Second Brain
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

// Main Landing Component
const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
    </div>
  );
};

export default Landing;
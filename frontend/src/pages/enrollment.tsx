import React from "react";
import {
  CheckCircle2,
  ShieldCheck,
  Zap,
  Globe,
  Clock,
  Award,
} from "lucide-react";

const Enrollment = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* LEFT COLUMN: Value Proposition */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-800 mb-4 leading-tight">
              Ready to level up your{" "}
              <span className="text-brand-10">Backend</span> skills?
            </h1>
            <p className="text-slate-500 text-lg">
              Join 2,000+ students already mastering NestJS and Microservices.
              Get instant access to everything below.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                icon: <Clock className="text-brand-10" />,
                text: "15+ Hours of High-Quality Video",
              },
              {
                icon: <Globe className="text-brand-10" />,
                text: "Lifetime Access to Course Material",
              },
              {
                icon: <Zap className="text-brand-10" />,
                text: "Hands-on Projects & Source Code",
              },
              {
                icon: <Award className="text-brand-10" />,
                text: "Official Certificate of Completion",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm"
              >
                <div className="p-2 bg-brand-10/10 rounded-lg">{item.icon}</div>
                <span className="font-semibold text-slate-700">
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-2 text-slate-400 text-sm italic">
            <ShieldCheck size={18} />
            <span>30-Day Money Back Guarantee. No questions asked.</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Order Summary Card */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-indigo-100 border border-slate-100 sticky top-10">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Order Summary
          </h2>

          {/* Course Preview */}
          <div className="flex items-center space-x-4 mb-8 p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="w-24 h-16 bg-slate-200 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1587620498307-299690185591?q=80&w=200"
                alt="Course"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm line-clamp-1">
                Mastering NestJS Backend
              </h3>
              <p className="text-xs text-slate-500">By Areeba Mujahid</p>
            </div>
          </div>

          {/* Pricing Details */}
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-slate-500">
              <span>Original Price</span>
              <span className="line-through font-medium">$99.00</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Discount (Limited Time)</span>
              <span className="text-green-500 font-medium">-$50.00</span>
            </div>
            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <span className="text-xl font-bold text-slate-800">
                Total Price
              </span>
              <span className="text-3xl font-black text-brand-10">$49.00</span>
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full bg-brand-10 hover:bg-brand-10/90 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-200 active:scale-[0.98] flex items-center justify-center space-x-3 mb-6">
            <span>Proceed to Payment</span>
            <CheckCircle2 size={20} />
          </button>

          {/* Trust Badges */}
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold text-slate-400">
              <span>Secured by</span>
              <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                Stripe
              </span>
            </div>
            <div className="flex space-x-4">
              {/* Dummy Card Icons */}
              <div className="w-8 h-5 bg-slate-100 rounded"></div>
              <div className="w-8 h-5 bg-slate-100 rounded"></div>
              <div className="w-8 h-5 bg-slate-100 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Enrollment;

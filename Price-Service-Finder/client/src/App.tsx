import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import { BottomNav } from "@/components/layout/BottomNav";

// Pages
import Splash from "@/pages/Splash";
import Onboarding from "@/pages/Onboarding";
import Auth from "@/pages/Auth";
import Home from "@/pages/Home";
import CategoryList from "@/pages/CategoryList";
import Detail from "@/pages/Detail";
import SMMInfo from "@/pages/SMMInfo";
import Profile from "@/pages/Profile";
import Explore from "@/pages/Explore";
import Settings from "@/pages/Settings";
import Legal from "@/pages/Legal";
import Categories from "@/pages/Categories";
import ServiceList from "@/pages/ServiceList";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Splash} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/auth" component={Auth} />
      
      {/* Protected-ish Routes */}
      <Route path="/home" component={Home} />
      <Route path="/categories" component={Categories} />
      <Route path="/services/:categoryId" component={ServiceList} />
      <Route path="/explore" component={Explore} />
      <Route path="/settings" component={Settings} />
      <Route path="/legal/:type" component={Legal} />
      <Route path="/detail/:id" component={Detail} />
      <Route path="/smm-info" component={SMMInfo} />
      <Route path="/profile" component={Profile} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-md mx-auto bg-[#0f172a] min-h-screen relative shadow-2xl overflow-hidden">
        <Router />
        <BottomNav />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;

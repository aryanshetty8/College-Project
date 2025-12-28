{/*"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl">
        <span className="">Quickflow:</span>  Your Personal Knowledge Workspace
      </h1>

      <h3 className="text-base font-light opacity-70 sm:text-xl md:text-xl">
        Quickflow is the connected workspace where <br />
        better, faster work happens.
      </h3>
      {isLoading && (
        <div className="flex w-full items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href={"/documents"}>
            Enter Quickflow
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      )}
    {/*  {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
         <Button>
            Get Quickflow free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button> 
        </SignInButton>
      )}
    </div>
  );
};

export default Heading;*/}

const Heading = () => {
  return (
    <div className="flex flex-col items-center text-center">
      
      {/* Small tag line above main heading */}
      <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
        A Task Management System
      </p>

      {/* Main heading */}
      <h1 className="max-w-4xl text-4xl font-bold text-black dark:text-white sm:text-5xl md:text-6xl">
        Quickflow: Your Personal Knowledge Workspace
      </h1>

      {/* Sub heading */}
     <span className="mb-4 rounded-full bg-gray-200 px-4 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
  A Task Management System
</span>


    </div>
  );
};

export default Heading;


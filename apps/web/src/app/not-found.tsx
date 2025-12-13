"use client";
import { Button } from "@/components";
import { DynamicShowLottie } from "@/components/dynamic/Dynamic";

const NotFound = () => {
	return (
		<div className="w-full max-w-xl text-center">
			<DynamicShowLottie path="/lotties/404.json" className="mx-auto" />

			<p className="mt-5 text-3xl capitalize md:text-4xl text-dark-2">
				page not found
			</p>

			<Button type="link" href="/" size="lg" className="mt-20" sameTab center>
				go home
			</Button>
		</div>
	);
};

export default NotFound;

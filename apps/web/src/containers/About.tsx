"use client";

import { useEffect, useState } from "react";
import { AuthorImage, Link, ListItem, Wrapper } from "@/components";
import { aboutSection } from "@/lib/content/about";
import { author } from "@/lib/content/portfolio";
import { getId } from "@/lib/utils/helper";
import { getSectionAnimation } from "@/styles/animations";

const About = () => {
	const { title, img, list } = aboutSection;
	const [domLoaded, setDomLoaded] = useState(false);

	useEffect(() => {
		setDomLoaded(true);
	}, []);

	return domLoaded ? (
		<Wrapper id="about" {...getSectionAnimation}>
			<h2 className="heading-secondary">{title}</h2>
			<main className="flex flex-col items-center gap-16 lg:items-start lg:flex-row">
				<div className="space-y-4 lg:w-3/5">
					<p>
						Hi, my name is Wendell Borges, I studied at{" "}
						<Link
							href="https://www.uninove.br/"
							target="_blank"
							className="text-accent"
						>
							Uninove
						</Link>
						, and I'm a passionate full stack developer with a strong focus on Next.js and NestJS.
					</p>
					<p>
						I'm also an artist at heart, always exploring creativity while diving deep into technology.
						Fast-forward to today, I've had the privilege of working at companies such as{" "}
						<strong>Start Your App</strong>, <strong>Grupo Permaneo</strong>
						 and others — experiences that helped me grow both technically and professionally.
					</p>

					<p>
						My main focus these days is expanding my expertise in modern web technologies
						and growing professionally as a full stack developer.
					</p>

					{list && (
						<>
							<p>{list.title}</p>
							<ul className="grid w-2/3 grid-cols-2 gap-1 text-sm">
								{list.items.map((item) => (
									<ListItem key={getId()}>{item}</ListItem>
								))}
							</ul>
						</>
					)}
				</div>
				<AuthorImage src={img} alt={author.name} />
			</main>
		</Wrapper>
	) : null;
};

export default About;

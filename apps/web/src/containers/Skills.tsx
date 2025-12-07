"use client";

import { useTheme } from "next-themes";
import { Skill, Wrapper } from "@/components";
import { skillsSection } from "@/lib/content/skills";
import { getSectionAnimation } from "@/styles/animations";

const Skills = () => {
  const { title, skills } = skillsSection;
  const { theme } = useTheme();

  return (
    <Wrapper id="skills" {...getSectionAnimation}>
      <h2 className="text-center heading-secondary">{title}</h2>

      <div className="space-y-32">
        {skills.map(({ id, lottie, softwareSkills, points, title }) => (
          <Skill
            key={id}
            className="odd:lg:flex-row-reverse"
            lottie={lottie[theme === "dark" ? "dark" : "light"]}
            skills={softwareSkills}
            points={points}
            title={title}
            {...getSectionAnimation}
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default Skills;

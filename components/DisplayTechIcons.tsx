import { getTechLogos } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import { cn } from '@/lib/utils'; // Assuming `cn` is a className merge utility like clsx or tailwind-variants

interface TechIconProps {
  techStack: string[];
}

const DisplayTechIcone = async ({ techStack }: TechIconProps) => {
  const techIcons = await getTechLogos(techStack);

  return (
    <div className='flex flex-row'>
      {techIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div
          key={tech}
          className={cn(
            'relative group bg-dark-300 rounded-full p-2 flex-center',
            index >= 1 && '-ml-3'
          )}
        >
          <span className='tech-tooltip'>{tech}</span>
          <Image
            src={url}
            alt={tech}
            width={100}
            height={100}
            className='size-5'
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayTechIcone;

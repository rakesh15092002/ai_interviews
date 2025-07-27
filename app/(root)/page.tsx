import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { dummyInterviews } from '@/public/constants';
import InterviewCard from '@/components/InterviewCard';

const Page = () => {
  return (
    <>
      {/* CTA Section */}
      <section className='card-cta flex flex-col md:flex-row items-center justify-between gap-6'>
        <div className='flex flex-col gap-6 max-w-lg'>
          <h2 className='text-2xl font-bold'>
            Get Interview-Ready with AI-Powered Practice & Feedback
          </h2>
          <p className='text-muted-foreground'>
            Practice on real interview questions & get instant feedback
          </p>
          <Button asChild className='btn-primary max-sm:w-full'>
            <Link href='/interview'>Start an Interview</Link>
          </Button>
        </div>

        <Image
          src='/robot.png'
          alt='Robot'
          width={400}
          height={400}
          className='max-sm:hidden'
        />
      </section>

      {/* Your Interviews */}
      <section className='flex flex-col gap-6 mt-8'>
        <h2 className='text-xl font-semibold'>Your Interviews</h2>
        <div className='interview-section flex flex-wrap gap-4'>
          {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id} />
          ))}
        </div>
      </section>

      {/* Take an Interview */}
      <section className='flex flex-col gap-6 mt-8'>
        <h2 className='text-xl font-semibold'>Take an Interview</h2>
        <div className='interview-section flex flex-wrap gap-4'>
          {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id + '-take'} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Page;

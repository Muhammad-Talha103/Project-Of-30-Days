
import Head from 'next/head';
import DigitalClock from '../Day-06/component/digital-clock/Digital-clock';

export default function Home() {
  return (
    <div>
      {/* <Head>
        <title>Digital Clock</title>
        <meta name="description" content="A simple digital clock using Next.js and Tailwind CSS" />
      </Head> */}
      <DigitalClock />
    </div>
  );
}


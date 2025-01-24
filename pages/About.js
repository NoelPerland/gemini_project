// pages/about.js
import Head from "next/head";

const About = () => {
  const team = [
    {
      name: "Noel Perland",
      title: "CEO, Design Lead, Frontend Developer, Git Admin",
    },
    { name: "Hampus", title: "Frontend Developer, Co-Founder" },
    { name: "Irene", title: "Frontend Developer, Co-Founder" },
    { name: "Karro", title: "Frontend Developer, Co-Founder" },
    { name: "Helin", title: "Frontend Developer, Co-Founder" },
    { name: "Tyler Winklevoss", title: "Gemini CEO" },
  ];

  return (
    <>
      <Head>
        <title>About Us</title>
        <meta name="description" content="Learn more about our amazing team." />
      </Head>
      <div className="bg-purple-900 text-white min-h-screen p-8">
        <h1 className="text-4xl font-bold text-center text-purple-300">
          About Us
        </h1>
        <p className="text-lg text-center text-purple-200 mt-4">
          Meet our passionate and skilled team:
        </p>
        <div className="grid md:grid-cols-3 gap-8 py-28 px-12">
          {team.map((member, index) => (
            <div
              className="bg-purple-700 p-6 rounded-lg shadow-lg border border-purple-500 hover:border-purple-300 hover:scale-105 transform transition duration-200 text-center"
              key={index}
            >
              <h2 className="text-2xl font-semibold text-purple-100">
                {member.name}
              </h2>
              <p className="text-purple-200 mt-2">{member.title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default About;

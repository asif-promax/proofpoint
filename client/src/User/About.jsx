import React from "react";
import proof from "../images/proof.jpg";

const About = () => {
  return (
    <div className="mt-10 mx-15 space-y-10">
      <h1 className="text-5xl text-center font-bold">Our Mission & Team</h1>
      <p className="text-center">
        At ProofPoint, we strive to empower users with a transparent and
        user-friendly platform. Meet the dedicated <br /> team behind our
        success.
      </p>
      <div className="flex flex-col md:flex-row gap-11 ">
        <h1 className="w-full underline md:w-2/5 text-3xl font-semibold text-center">
          Our Commitment to Users and Community
        </h1>
        <p className="w-full md:w-3/5 text-justify">
          At ProofPoint, our mission is to create a safe and accessible platform
          for users to report issues, ensuring that every complaint is heard and
          addressed promptly. We value transparency, accountability, user
          empowerment, and innovation in all our operations. Our dedicated team,
          led by experienced professionals, is committed to enhancing user
          experience and fostering a supportive community. Meet our team members
          who are passionate about making a difference: Alice Johnson, our CEO,
          brings over 10 years of experience in technology and customer service;
          Mark Smith, our CTO, is an expert in developing innovative platforms;
          and Sarah Lee, our Community Manager, focuses on building strong user
          engagement.
        </p>
      </div>
      <div className="max-w-4xl m-auto">
        <img src={proof} alt="" className="" />
      </div>
    </div>
  );
};

export default About;
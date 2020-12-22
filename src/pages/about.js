import React from "react";

import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";
import { Link } from "react-router-dom";

import PaperCard from "../components/papercard";

const About = () => {
  return (
    <PaperCard maxWidth={550}>
      <Link to="/" className="link">
        <span className="navigation body">← Back</span>
      </Link>
      <hr />
      <br />
      <div className="about-header">How does it work?</div>
      <div className="body">
        It's pretty simple! You can send and receive virtual holiday cards with
        audio messages and gifs attached. But there’s a catch: when you receive
        a message, you must unlock it by sending a message of your own to
        someone first :)
      </div>
      <br />
      <br />
      <div className="about-header">What is this for?</div>
      <div className="about-quote">
        “Today, three in five Americans classify as lonely.”
      </div>
      <div className="body">
        Our loneliness pandemic has persisted in light of a viral pandemic that
        has necessitated our social distance. And feed-based social media has
        long reinforced this spread of loneliness, overtaking connection with
        stimulation and our sense of self with virtual validation.
      </div>
      <br />
      <br />
      <div>
        If you're interested in building more projects like these,{" "}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSenof0DZ6B5CCd_3mwOOyAzh5wxl7QCNe5vt1ZX4FadvRJ76g/viewform?fbzx=1924041856365897544"
          target="_blank"
          className="hyperlink italic"
        >
          join us
        </a>
      </div>
      <br />
      <Link
        to="/"
        className="link"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <button className="buttonMain buttonPrimary">Send a Letter</button>
      </Link>
    </PaperCard>
  );
};

export default About;

// <div className="about-title">
//   YPost is an exploration of how we can use technology <br />
//   to facilitate meaningful connection among people.
// </div>;

// <div className="about-citation">
//   Loneliness and the Workplace, 2020 U.S. Report{" "}
//   <a
//     className="hyperlink"
//     target="_blank"
//     rel="noreferrer noopener"
//     href="https://www.cigna.com/about-us/newsroom/news-and-views/press-releases/2020/cigna-takes-action-to-combat-the-rise-of-loneliness-and-improve-mental-wellness-in-america"
//   >
//     LINK
//   </a>
// </div>;

// <div className="body">
// In our socially distant times, our team hopes to provide a simple,
// unique method of communication—so we can find connection in separation.
// </div>
// <div className="body">
// The holidays are a time for reflection—about the people you love, the
// memories you have made. Who has supported you this semester? Made you
// laugh? Made our uncertain year feel just a bit less chaotic? Let’s bring
// some light to their day.
// </div>

// <div className="about-header">let's pay kindness forward</div>
//       <div className="about-quote">
//         “[L]oneliness is not about how many people you interact with. … It's
//         about the meaning you share with other people.”
//       </div>
//       <div className="about-citation">
//         Johann Hari on the Your Undivided Attention, Episode 8: The Opposite of
//         Addition{" "}
//         <a
//           className="hyperlink"
//           target="_blank"
//           rel="noreferrer noopener"
//           href="https://assets-global.website-files.com/5f0e1294f002b1bb26e1f304/5f0e1294f002b12e30e1f418_CHT-Undivided-Attention-Podcast-Ep.8-The-Opposite-of-Addiction.pdf"
//         >
//           LINK
//         </a>
//       </div>

// <div className="body">
//   We are in the midst of a pandemic—a mental health pandemic—and young people
//   are particularly vulnerable. A recent survey by&nbsp;
//   <a
//     className="hyperlink"
//     target="_blank"
//     rel="noreferrer noopener"
//     href="https://www.cigna.com/about-us/newsroom/news-and-views/press-releases/2020/cigna-takes-action-to-combat-the-rise-of-loneliness-and-improve-mental-wellness-in-america"
//   >
//     CIGNA
//   </a>{" "}
//   finds that nearly three quarters of the Gen Z population sometimes or always
//   feels alone.
// </div>;

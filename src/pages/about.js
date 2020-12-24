import React from "react";

import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";
import { Link } from "react-router-dom";

import PaperCard from "../components/papercard";

const About = (props) => {
  return (
    <PaperCard maxWidth={550}>
      <Link to="/" className="link">
        <span className="navigation body">← Back</span>
      </Link>
      <hr />
      <div className="about-title">
        YPost is an exploration of how we can use technology <br />
        to facilitate meaningful connection among people.
      </div>
      <div className="about-header">a pandemic, not the viral kind</div>
      <div className="about-quote">
        “Today, three in five Americans (61%) classify as lonely.”
      </div>
      <div className="about-citation">
        Loneliness and the Workplace, 2020 U.S. Report{" "}
        <a
          className="hyperlink"
          target="_blank"
          rel="noreferrer noopener"
          href="https://www.cigna.com/about-us/newsroom/news-and-views/press-releases/2020/cigna-takes-action-to-combat-the-rise-of-loneliness-and-improve-mental-wellness-in-america"
        >
          LINK
        </a>
      </div>
      <div className="about-text">
        We are in the midst of a pandemic—a mental health pandemic—and young people are
        particularly vulnerable. A recent survey by&nbsp;
        <a
          className="hyperlink"
          target="_blank"
          rel="noreferrer noopener"
          href="https://www.cigna.com/about-us/newsroom/news-and-views/press-releases/2020/cigna-takes-action-to-combat-the-rise-of-loneliness-and-improve-mental-wellness-in-america"
        >
          CIGNA
        </a> finds that nearly three quarters of the Gen Z population
        sometimes or always feels alone.
      </div>
      <div className="about-text">
        Our loneliness pandemic has persisted in light of a viral pandemic
        that has necessitated our social distance.
        And feed-based social media has long reinforced
        this spread of loneliness, overtaking connection with
        stimulation and our sense of self with virtual validation.
      </div>
      <br />
      <div className="about-header">let's pay kindness forward</div>
      <div className="about-quote">
        “[L]oneliness is not about how many people you interact with. … It's
        about the meaning you share with other people.”
      </div>
      <div className="about-citation">
        Johann Hari on the Your Undivided Attention, Episode 8: The Opposite of
        Addition{" "}
        <a
          className="hyperlink"
          target="_blank"
          rel="noreferrer noopener"
          href="https://assets-global.website-files.com/5f0e1294f002b1bb26e1f304/5f0e1294f002b12e30e1f418_CHT-Undivided-Attention-Podcast-Ep.8-The-Opposite-of-Addiction.pdf"
        >
          LINK
        </a>
      </div>
      <div className="about-text">
        In our socially distant
        times, our team hopes to provide a simple, unique method of
        communication—so we can find connection in separation.
      </div>
      <div className="about-text" style={{ fontWeight: 600 }}>
        YPost is an platform where Yalies can send and receive
        messages—audio recordings and/or text-based notes—to and from friends and classmates.
        But there’s a catch: when you receive a message, you must unlock it
        by sending a message of your own to a recipient of your choice.
      </div>
      <div className="about-text">
        The holidays are a time for reflection—about the people
        you love, the memories you have made. Who has supported you
        this semester? Made you laugh? Made our uncertain year feel just a bit
        less chaotic? Let’s bring some light to their day.</div>
      <br />
      <Link
        to="/"
        className="link"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <button className="buttonMain buttonPrimary" style={{ width: "200px" }}>
          Send a Letter
        </button>
        <br />
        <div>
        To report a problem or share a thought, contact us at&nbsp;
        <a
          href="mailto: ypost.connect@gmail.com"
          target="_blank"
          className="hyperlink italic"
        >
          ypost.connect@gmail.com
        </a>.
      </div>
      </Link>
    </PaperCard>
  );
};

export default About;

import React, { useEffect } from "react";

import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";
import { Link } from "react-router-dom";
import { sendAmplitudeData } from "../util/amplitude";

import PaperCard from "../components/papercard";

const About = () => {
  useEffect(() => {
    sendAmplitudeData("Opened about page");
  }, []);

  return (
    <PaperCard maxWidth={550}>
      <Link to="/" className="link">
        <span className="navigation body">← Back</span>
      </Link>
      <hr />
      <br />
      <div className="about-quote">
        YPost is an exploration of how we can use technology to facilitate
        meaningful connection among people.
      </div>
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

      <div className="body">
        Three in five Americans classify as lonely (
        <span>
          <a
            className="hyperlink"
            target="_blank"
            rel="noreferrer noopener"
            href="https://www.cigna.com/about-us/newsroom/news-and-views/press-releases/2020/cigna-takes-action-to-combat-the-rise-of-loneliness-and-improve-mental-wellness-in-america"
          >
            Cigna
          </a>
        </span>
        ). Our loneliness pandemic has persisted in light of a viral pandemic
        that has necessitated our social distance. And feed-based social media
        has long reinforced this spread of loneliness, overtaking connection
        with stimulation and our sense of self with virtual validation.
      </div>
      <br />
      <br />
      <div className="body">
        This holiday season, bring light to someone’s day.
      </div>
      <br />
      <Link
        to="/"
        className="link"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <button className="buttonMain buttonPrimary">Send a Letter now</button>
      </Link>
      <br />
      <div className="body">
        If you're interested in building more projects like these,{" "}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSenof0DZ6B5CCd_3mwOOyAzh5wxl7QCNe5vt1ZX4FadvRJ76g/viewform?fbzx=1924041856365897544"
          target="_blank"
          className="hyperlink italic"
        >
          join us
        </a>
        .
      </div>
      <br />
    </PaperCard>
  );
};

export default About;

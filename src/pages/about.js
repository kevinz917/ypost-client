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
        YPost is an exploration of how we can use technology to facilitate
        meaningful connection among people.
      </div>
      <div className="about-header">a pandemic, the social kind</div>
      <div className="about-quote">
        “More than a fifth of adults in the United States (22 percent) and the
        United Kingdom (23 percent) . . . say they often or always feel lonely,
        feel that they lack companionship, feel left out, or feel isolated from
        others.”
      </div>
      <div className="about-citation">
        Loneliness and Social Isolation in the United States, the United
        Kingdom, and Japan: An International Survey (2018) LINK
      </div>
      <div className="about-text">
        A 2019 study by CIGNA finds an even more dire situation—that 3 in 5
        Americans (61%) classify as lonely, with the Gen Z population being most
        vulnerable: nearly three quarters of Gen Z respondents (73%) answered
        that they sometimes or always feels alone.
      </div>
      <div className="about-text">
        Our loneliness pandemic has only persisted in light of a viral pandemic
        that has necessitated our physical isolation, our social distance—in a
        SocialPro survey of 1,200 adults conducted in April, nearly one third of
        respondents (30.8%) reported that they felt more lonely because of the
        COVID-19 pandemic.
      </div>
      <div className="about-text">
        Further, technology—specifically feed-based social media—has reinforced
        the spread of loneliness, often replacing true connection with
        stimulation, our sense of community with tribalism, and our sense of
        self with likes and comments and hollow validation.
      </div>
      <div className="about-header">let's pay kindness forward</div>
      <div className="about-quote">
        “[L]oneliness is not about how many people you interact with. … It's
        about the meaning you share with other people.”
      </div>
      <div className="about-citation">
        Johann Hari on the Your Undivided Attention, Episode 8: The Opposite of
        Addition LINK
      </div>
      <div className="about-text">
        Our project, YPost, is an exploration of how we can use technology to
        facilitate meaningful connection among people. In our current COVID-19
        times, our team hopes to provide a simple, unique, meaningful method of
        communication—so we can find connection in separation.
      </div>
      <div className="about-text" style={{ fontWeight: 700 }}>
        YPost is a simple interface where Yale users can send and receive
        messages—audio recordings and/or text-based messages—to and from their
        friends and classmates. But there’s one catch: when you receive a
        message, you must unlock it by sending your own message to a recipient
        of your choice.
      </div>
      <div className="about-text">
        The holiday season is naturally a time for reflection—about the people
        that you love, the memories that you have made. Who has supported you
        this semester? Who has made you laugh? Who has made our turbulent crazy
        uncertain year feel just a bit less chaotic, a bit more grounded?
      </div>
      <div className="about-text">Let’s bring some light to their day.</div>
      <div className="about-header">a different kind of post</div>
      <div className="about-quote">Why post?</div>
      <div className="about-text">
        This holiday season, in addition to making a social media post, let’s
        send a different kind of post—a virtual postcard, a YPost. And at the
        same time, let’s consider why we post—why we choose to share the moments
        and memories that we do with the audiences that we choose.
      </div>
    </PaperCard>
  );
};

export default About;

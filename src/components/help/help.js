import "./help.css";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

const Help = () => {
  return (
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLSdxHGsyQVb2iKBtUkF0eXKMHoIyvIbbLVj7IA-IoAWQ6gIfBg/viewform?usp=sf_link"
      target="_blank"
    >
      <OverlayTrigger overlay={<Tooltip>Report a problem</Tooltip>}>
        <div className="help-container">Report</div>
      </OverlayTrigger>
    </a>
  );
};

export default Help;

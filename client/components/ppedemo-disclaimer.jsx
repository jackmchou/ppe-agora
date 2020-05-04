import React from 'react';
import { Link } from 'react-router-dom';

export default function PPEDemoDisclaimer(props) {
  return (
    <div className="modal d-block" id="demoDisclaimerModal" tabIndex="-1" role="dialog"
      aria-labelledby="demoDisclaimerModalTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content text-white">
          <div className="modal-header bg-dark d-inline">
            <h5 className="modal-title text-center" id="demoDisclaimerModalTitle">Welcome to PPE Agora</h5>
          </div>
          <div className="modal-body text-dark">
            This website is a content management application created for the purpose of <strong>DEMOSTRATION ONLY</strong>.
            By choosing the accept button below you acknowledge:
            <ol>
              <li>The merchandise shown here is <b>NOT</b> available for purchase</li>
              <li>You will <b>NOT</b> provide genuine personal information</li>
              <li>You are aware no purchase will be processed</li>
            </ol>
          </div>
          <div className="modal-footer bg-dark">
            <button type="button" className="btn btn-primary"
              onClick={() => props.ppeAcceptTerms()} data-dismiss="modal">Accept</button>
            <Link to="/">
              <button type="button" className="btn btn-secondary"
                data-dismiss="modal" aria-label="Close">Go Back</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

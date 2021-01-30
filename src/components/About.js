import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="aboutText">
      <h2>About</h2>
      <p>
        Lisker Blockchain Demo is a simple demonstration of how to integrate
        Lisker into your project. It also shows how to store and retrieve the
        Lisker Id from a Lisk sidechain that uses the Lisker module. The client
        is made in JavaScript using the React framework and Lisk Elements. It
        communicates with the lisker blockchain through websocket.
        <br />
        After logging in the client app retrieves the Lisker Id from the users
        account or displays a default Lisker when no Id is registered. In the
        Lisker page you can create your own Lisker and register it to your
        account. Whenever you make a transaction, your avatar will be shown in
        the recipients' wallet.
      </p>
      <p>In the client, two main Lisker react components are used:</p>
      <h3>Lisker Generator</h3>
      <code>{`<LiskerGenerator getLiskerId={getLiskerId} setLiskerId="t119t311t417t491t525t535t547t551t701t801t856c1E5EFFDc21EA33Fc3E38E61c42C1B18"/>`}</code>
      <p>
        Every time the Lisker is changed by the user, the new Id can be retrieve
        by attaching a function to <i>getLiskerId</i>. The property{" "}
        <i>setLiskerId</i> allows you to change the Lisker image by passing a
        valid Lisker Id.
      </p>
      <h3>Lisker Viewer</h3>
      <code>{`<LiskerViewer setLiskerId="t119t311t417t491t525t535t547t551t701t801t856c1E5EFFDc21EA33Fc3E38E61c42C1B18" size="150"/>`}</code>
      <p>
        Lisker viewer is a lightweight version of Lisker Generator, it only
        accepts a <i>setLiskerId</i> and <i>size</i>. You can directly pass an
        id or retrieve it from a Lisker account and use a variable. When you
        only need to display a Lisker avatar then this component is recommended.
      </p>
      <p>
        As this is a demo some improvements can be made like regular updating of
        balance and transactions or displaying the users delegate name in the
        welcome message after logging in. Feel free to modify and use Lisker in
        your own, blockchain, projects!
      </p>
      <p>
        Lisker blockchain server:{" "}
        <a href="http://node.lisker.io/api/node/info">
          node.lisker.io/api/node/info
        </a>
        <br />
        Lisker blockchain demo source code:{" "}
        <a href="https://github.com/Korben3/lisker-blockchain-demo">
          github.com/Korben3/lisker-blockchain-demo
        </a>
        <br />
        Official Lisker site: <a href="https://lisker.io">lisker.io</a>
        <br />
      </p>
      <div className="credit">
        Powered by <a href="http://lisk.io">Lisk</a> - Icons from{" "}
        <a href="https://icons.getbootstrap.com">Bootstrap</a> - Created by{" "}
        <a href="http://korben3.com">korben3</a>
      </div>
    </div>
  );
};
export default About;

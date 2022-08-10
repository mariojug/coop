import React, { useState, useRef, useEffect } from "react";
import SimplePeer, { Instance, SignalData } from "simple-peer";

enum ConnectionStatus {
  OFFERING,
  RECEIVING,
  CONNECTED,
}

const webSocketConnection = new WebSocket("ws://localhost:8080/videochat");

const VideoChat = () => {
  const videoSelf = useRef<HTMLVideoElement>(null);
  const videoCaller = useRef<HTMLVideoElement>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>();
  const [offerSignal, setOfferSignal] = useState<SignalData>();
  const [simplePeer, setSimplePeer] = useState<Instance>();

  useEffect(() => console.log(connectionStatus), [connectionStatus]);

  useEffect(() => {
    webSocketConnection.onmessage = (message: any) => {
      const payload = JSON.parse(message.data);
      if (payload?.type === "offer") {
        setOfferSignal(payload);
        setConnectionStatus(ConnectionStatus.RECEIVING);
      } else if (payload?.type === "answer") simplePeer?.signal(payload);
    };
  }, [simplePeer]);

  const sendOrAcceptInvitation = (isInitiator: boolean, offer?: SignalData) => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((mediaStream) => {
        const video = videoSelf.current;
        video!.srcObject = mediaStream;
        video!.play();

        const sp = new SimplePeer({
          trickle: false,
          initiator: isInitiator,
          stream: mediaStream,
        });

        if (isInitiator) setConnectionStatus(ConnectionStatus.OFFERING);
        else offer && sp.signal(offer);

        sp.on("signal", (data) =>
          webSocketConnection.send(JSON.stringify(data))
        );
        sp.on("connect", () => setConnectionStatus(ConnectionStatus.CONNECTED));
        sp.on("stream", (stream) => {
          const video = videoCaller.current;
          video!.srcObject = stream;
          video!.play();
        });
        setSimplePeer(sp);
      });
  };

  return (
    <>
      <div className="web-rtc-page">
        {connectionStatus === undefined && (
          <button onClick={() => sendOrAcceptInvitation(true)}>CALL</button>
        )}
        {connectionStatus === ConnectionStatus.OFFERING && (
          <div className="loader"></div>
        )}
        {connectionStatus === ConnectionStatus.RECEIVING && (
          <button onClick={() => sendOrAcceptInvitation(false, offerSignal)}>
            ANSWER CALL
          </button>
        )}
        <div className="video-container">
          <video ref={videoSelf} className="video-block" />
          <video ref={videoCaller} className="video-block" />
        </div>
      </div>
    </>
  );
};

export default VideoChat;

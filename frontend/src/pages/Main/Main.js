import { useState, useEffect } from 'react';
import Stream from '../../components/Stream';
import './Main.css';

const Main = () => {
  return (
    <div className="page-container main">
      <Stream />
      {/* <AudioPlayerFooter /> */}
    </div>
  );
};

export default Main;

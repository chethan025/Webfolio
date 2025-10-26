import React from 'react'
import { useEffect, useState } from 'react';

const SvgRender = ({ path }) => {
  const [code, setCode] = useState('');

  useEffect(() => {
    fetch(path)
      .then(res => res.text())
      .then(setCode);
  }, [path]);

  return <span dangerouslySetInnerHTML={{ __html: code }} />;
};
export default SvgRender
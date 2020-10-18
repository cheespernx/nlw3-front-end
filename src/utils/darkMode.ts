import React, { useState } from 'react';

const [darkMode, setDarkMode] = useState(false);
const toggle = () => {
  setDarkMode(!darkMode);
}

export default toggle;
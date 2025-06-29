import React, { useEffect, useState, useMemo } from 'react';
import './App.css';

function getRandomPadding(min = 5, max = 40) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const images = [
  'art/vangoghmuseum-s0382M1987-800.jpg',
  'art/b-1848-1740628837237.jpg',
  'art/6127847_A-Rain-Rereleases-jpeg.jpg',
  'art/6127855_B-Houses-of-the-Holy-jpeg.jpg',
  'art/tumblr_02c34db8265bd0013ea892c26a477bac_e8a70754_1280.jpg',
  'art/41090052704_5a2e34cef1_o.jpg',
  'art/1000612872.jpg',
  'art/H0062-L10935918.jpg',
  'art/1970-244-20-dig2018.jpg',
  'art/sc220021.jpg',
  'art/2000s-steve-madden-ads-v0-l6m737t2gjbc1 (1).jpg',
  'art/untitled.jpg',
  'art/Untitled-30.jpg',
  'art/Untitled-28.jpg',
  'art/basquiat_untitled.jpg.jpg',
  'art/download (2).jpg',
  'art/3145564580_10a94e6a44_z.jpg',
  'art/bernard-(bernie)-fuchs-man-shooting-baskets-on-empty-playground-at-dusk.jpg',
  'art/bernard-(bernie)-fuchs-earl-campbell,-houston-oilers,-circa-1980.jpg',
  'art/bernard-(bernie)-fuchs-sailing.jpg',
  'art/bernard-(bernie)-fuchs-st.-andrews.jpg',
  'art/bee.jpg',
  'art/the-hands-of-dr.-moore-diego-rivera.jpg',
  'art/s-l1200.jpg',
  'art/CCT_summer19_Page_39_Image_0001.jpg',
  'art/Lost-Boys-AKA-BB_Kerry-James-Marshall-1024x947 (1).png',
  'art/2350.png',
  'art/george-snr-inness-farm-landscape-cattle-in-pasture-sunset-nantucket-c-1883_u-l-q1ofajn0.jpg',
  'art/b07d644c760362ea6d5fb1bd56c12618.jpg',
  'art/george-wesley-bellows-sketch-of-anne-1923-24_u-l-q1oci4r0.jpg',
  'art/Christian Rohlfs - Nude 1911  - (MeisterDrucke-262831).jpg',
  'art/14350267298_faf4e7eb42_b.jpg',
  'art/44507592835_95d66e775d_b.jpg',
  'art/františek-kupka-blue-space-ca-1912-v0-cz1270g1tt6e1.jpg',
  'art/SC400990crp_w.jpg'
];

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

shuffle(images);

function App() {
  const [baseRGB] = useState({
    r: Math.floor(Math.random() * 156),
    g: Math.floor(Math.random() * 156),
    b: Math.floor(Math.random() * 156),
  });

  const [bgColor, setBgColor] = useState(`rgb(${baseRGB.r}, ${baseRGB.g}, ${baseRGB.b})`);
  const [focusedIndex, setFocusedIndex] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (focusedIndex !== null) return; // Stop background animation in focus mode

      const { clientX, clientY } = e;
      const w = window.innerWidth;
      const h = window.innerHeight;

      const xRatio = clientX / w;
      const yRatio = clientY / h;

      const red = Math.min(baseRGB.r + Math.floor(80 * xRatio), 255);
      const green = baseRGB.g;
      const blue = Math.min(baseRGB.b + Math.floor(80 * yRatio), 255);

      setBgColor(`rgb(${red}, ${green}, ${blue})`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [baseRGB, focusedIndex]);

  const imageStyles = useMemo(() =>
    images.map(() => ({
      marginTop: `${getRandomPadding()}px`,
      marginBottom: `${getRandomPadding()}px`,
      marginLeft: `${getRandomPadding()}px`,
      marginRight: `${getRandomPadding()}px`,
      width: '200px',
      height: '200px',
      objectFit: 'cover',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    })), []
  );

  return (
    <div
      style={{
        backgroundColor: bgColor,
        minHeight: '100vh',
        color: 'white',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {focusedIndex === null ? (
        <>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
            }}
          >
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Random ${index}`}
                style={imageStyles[index]}
                onClick={() => setFocusedIndex(index)}
              />
            ))}
          </div>
        </>
      ) : (
        <div
          onClick={() => setFocusedIndex(null)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
            height: '100vh',
            width: '100vw',
            cursor: 'pointer',
          }}
        >
          <img
            src={images[focusedIndex]}
            alt={`Focused ${focusedIndex}`}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 20px rgba(0,0,0,0.5)',
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;

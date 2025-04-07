import React from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Path, G, Circle } from 'react-native-svg';

export interface HSDLogoProps {
  size?: number;
  width?: number;
  height?: number;
  color?: string;
}

export default function HSDLogo({ 
  size = 80, 
  width, 
  height, 
  color = '#EF4444' 
}: HSDLogoProps) {
  const logoWidth = width || size;
  const logoHeight = height || size;

  return (
    <View style={{ width: logoWidth, height: logoHeight }}>
      <Svg width={logoWidth} height={logoHeight} viewBox="0 0 100 100">
        <Defs>
          <LinearGradient id="techGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={color} />
            <Stop offset="100%" stopColor="#B30000" />
          </LinearGradient>
          <LinearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FF5B54" />
            <Stop offset="100%" stopColor={color} />
          </LinearGradient>
        </Defs>
        
        <G transform="translate(50, 50)">
          {/* Merkez altıgen */}
          <Path
            d="M0,-25 L21.65,-12.5 L21.65,12.5 L0,25 L-21.65,12.5 L-21.65,-12.5 Z" 
            fill="url(#techGradient)"
            opacity="0.9"
          />
          
          {/* Bağlantı çizgileri */}
          <G>
            <Path d="M0,-25 L0,-35" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <Path d="M21.65,12.5 L30,18" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <Path d="M-21.65,12.5 L-30,18" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <Path d="M21.65,-12.5 L30,-18" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <Path d="M-21.65,-12.5 L-30,-18" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <Path d="M0,25 L0,35" stroke={color} strokeWidth="2" strokeLinecap="round" />
            
            {/* Bağlantı noktaları */}
            <Circle cx="0" cy="-35" r="4" fill="url(#nodeGradient)" />
            <Circle cx="30" cy="18" r="4" fill="url(#nodeGradient)" />
            <Circle cx="-30" cy="18" r="4" fill="url(#nodeGradient)" />
            <Circle cx="30" cy="-18" r="4" fill="url(#nodeGradient)" />
            <Circle cx="-30" cy="-18" r="4" fill="url(#nodeGradient)" />
            <Circle cx="0" cy="35" r="4" fill="url(#nodeGradient)" />
          </G>
          
          {/* İç yapı */}
          <Path
            d="M0,-12 L10.4,-6 L10.4,6 L0,12 L-10.4,6 L-10.4,-6 Z" 
            fill="#FFFFFF"
            opacity="0.25"
          />
          
          {/* Merkez nokta */}
          <Circle cx="0" cy="0" r="4" fill="#FFFFFF" opacity="0.85" />
          
          {/* Ekstra ağ çizgileri */}
          <G opacity="0.6">
            <Path d="M30,18 L40,28" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
            <Path d="M-30,18 L-40,28" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
            <Path d="M30,-18 L40,-28" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
            <Path d="M-30,-18 L-40,-28" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
            
            {/* Ekstra ağ noktaları */}
            <Circle cx="40" cy="28" r="2.5" fill={color} opacity="0.85" />
            <Circle cx="-40" cy="28" r="2.5" fill={color} opacity="0.85" />
            <Circle cx="40" cy="-28" r="2.5" fill={color} opacity="0.85" />
            <Circle cx="-40" cy="-28" r="2.5" fill={color} opacity="0.85" />
          </G>
        </G>
      </Svg>
    </View>
  );
} 
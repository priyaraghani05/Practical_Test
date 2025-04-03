import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get("window")

// based on iPhone6 scale
const scale = width / 375;


export const ResponsiveWidth = (w) => {
    return PixelRatio.roundToNearestPixel(width * (w / 100))
}

export const ResponsiveHeight = (h) => {
    return PixelRatio.roundToNearestPixel(height * (h / 100))
}


export const ResponsiveFont = (size) => {
    return Math.round(PixelRatio.roundToNearestPixel(scale * size))
}
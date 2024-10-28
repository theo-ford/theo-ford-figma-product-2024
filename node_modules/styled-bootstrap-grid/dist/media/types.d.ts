import { FlattenInterpolation, Interpolation, SimpleInterpolation, ThemedStyledProps } from 'styled-components';
import { Breakpoints, Theme } from '../components/ThemeProvider';
export declare enum MediaLabels {
    xs = "smaller",
    sm = "phone",
    md = "tablet",
    lg = "desktop",
    xl = "giant",
    xxl = "veryGiant"
}
export declare enum MediaAliases {
    smaller = "xs",
    phone = "sm",
    tablet = "md",
    desktop = "lg",
    giant = "xl",
    veryGiant = "xxl"
}
export declare type Media = MediaLabels | MediaAliases;
export declare type MediaTagFunction<P extends {} = {}, T extends Theme = Theme> = (strings: TemplateStringsArray | NonNullable<SimpleInterpolation>, ...interpolations: Interpolation<ThemedStyledProps<P, T>>[]) => FlattenInterpolation<ThemedStyledProps<P, T>>;
export declare type MapMediaToQuery = {
    [Key in Media]: MediaTagFunction;
};
export declare type MediaObject = MapMediaToQuery & {
    min: MapMediaToQuery;
    max: MapMediaToQuery;
};
export declare type GetBreakpointsFn = <P extends {} = {}>(props: ThemedStyledProps<P, Theme>) => Breakpoints;

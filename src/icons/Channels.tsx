import { createSvgIcon, SvgIconProps } from "@material-ui/core";
import React from "react";

const Channels = createSvgIcon(
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M22.2066 26.2723C20.3957 27.3688 18.2716 28 16 28C13.7284 28 11.6043 27.3688 9.7934 26.2723C9.9274 25.8726 10 25.4448 10 25C10 22.7909 8.20914 21 6 21C5.7019 21 5.41143 21.0326 5.13194 21.0945C4.4058 19.5481 4 17.8214 4 16C4 14.1786 4.4058 12.4519 5.13194 10.9055C5.41143 10.9674 5.7019 11 6 11C8.20914 11 10 9.20914 10 7C10 6.5552 9.9274 6.12736 9.7934 5.72768C11.6043 4.63116 13.7284 4 16 4C18.2716 4 20.3957 4.63116 22.2066 5.72768C22.0726 6.12736 22 6.5552 22 7C22 9.20914 23.7909 11 26 11C26.2981 11 26.5886 10.9674 26.8681 10.9055C27.5942 12.4519 28 14.1786 28 16C28 17.8214 27.5942 19.5481 26.8681 21.0945C26.5886 21.0326 26.2981 21 26 21C23.7909 21 22 22.7909 22 25C22 25.4448 22.0726 25.8726 22.2066 26.2723ZM23.2982 27.9496C21.173 29.2503 18.6741 30 16 30C13.3259 30 10.827 29.2503 8.70185 27.9496C7.9901 28.6019 7.04154 29 6 29C3.79086 29 2 27.2091 2 25C2 23.8076 2.52171 22.7371 3.34931 22.0043C2.48415 20.1847 2 18.1489 2 16C2 13.8511 2.48415 11.8153 3.34931 9.9957C2.52171 9.26286 2 8.19236 2 7C2 4.79086 3.79086 3 6 3C7.04154 3 7.99011 3.39808 8.70185 4.05039C10.827 2.7497 13.3259 2 16 2C18.6741 2 21.173 2.74971 23.2982 4.05039C24.0099 3.39808 24.9585 3 26 3C28.2091 3 30 4.79086 30 7C30 8.19236 29.4783 9.26286 28.6507 9.99569C29.5159 11.8153 30 13.8511 30 16C30 18.1489 29.5159 20.1847 28.6507 22.0043C29.4783 22.7371 30 23.8076 30 25C30 27.2091 28.2091 29 26 29C24.9585 29 24.0099 28.6019 23.2982 27.9496ZM6 9C7.10457 9 8 8.10457 8 7C8 5.89543 7.10457 5 6 5C4.89543 5 4 5.89543 4 7C4 8.10457 4.89543 9 6 9ZM26 9C27.1046 9 28 8.10457 28 7C28 5.89543 27.1046 5 26 5C24.8954 5 24 5.89543 24 7C24 8.10457 24.8954 9 26 9ZM28 25C28 26.1046 27.1046 27 26 27C24.8954 27 24 26.1046 24 25C24 23.8954 24.8954 23 26 23C27.1046 23 28 23.8954 28 25ZM6 27C7.10457 27 8 26.1046 8 25C8 23.8954 7.10457 23 6 23C4.89543 23 4 23.8954 4 25C4 26.1046 4.89543 27 6 27ZM17.6882 15C17.5151 13.5884 16.9729 12.0742 16 10.1898C15.0271 12.0742 14.4849 13.5884 14.3118 15H17.6882ZM18.3698 10.4862C20.2107 11.2784 21.5757 12.9657 21.917 15H19.7003C19.556 13.5436 19.1004 12.0837 18.3698 10.4862ZM19.7003 17H21.917C21.5757 19.0344 20.2107 20.7216 18.3697 21.5139C19.1003 19.9163 19.556 18.4564 19.7003 17ZM16 21.81C16.9729 19.9257 17.515 18.4115 17.6882 17H14.3118C14.485 18.4115 15.0271 19.9257 16 21.81ZM13.6302 10.4862C12.8996 12.0837 12.444 13.5436 12.2997 15H10.083C10.4243 12.9657 11.7893 11.2784 13.6302 10.4862ZM13.6303 21.5139C12.8997 19.9163 12.444 18.4564 12.2997 17H10.083C10.4243 19.0344 11.7893 20.7216 13.6303 21.5139ZM16 24C20.4183 24 24 20.4183 24 16C24 11.5817 20.4183 8 16 8C11.5817 8 8 11.5817 8 16C8 20.4183 11.5817 24 16 24Z"
    fill="currentColor"
  />,
  "Channels",
);

export default (props: SvgIconProps) => <Channels {...props} viewBox="0 0 32 32" />;

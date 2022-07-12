import { ComponentProps, FC } from "react";

export const WalletIcon: FC<ComponentProps<"svg">> = (
  props: ComponentProps<"svg">
) => {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className="h-6 w-6 inline text-gray-400 hover:text-green-300 bg-gray-900"
      viewBox="0 0 501.55 502.46"
      {...props}
    >
      <path
        d="M5078.48,5569.82q-100,0-200,0c-29.94,0-50.23-20.19-50.24-50.16q-.06-138,0-276c0-29,20.44-49.41,49.39-49.49,20.17,0,40.33.13,60.49-.14a20.93,20.93,0,0,0,10.19-2.86q96.26-58.5,192.32-117.28c17.48-10.66,38.29-8.12,52.13,6.28a49,49,0,0,1,6.22,8.4q31,50.68,61.88,101.51c1.89,3.13,3.9,4.17,7.49,4.19,8.14.05,16.5-.35,24.37,1.3,22.47,4.69,36.95,24,37,48.13q.09,76.74,0,153.48c0,41.17.07,82.33,0,123.49-.05,23.68-14.3,42.35-36.4,47.63a62.78,62.78,0,0,1-14.36,1.44Q5178.72,5569.9,5078.48,5569.82ZM5297.75,5302v-5.57q0-26.25,0-52.5c0-12.17-5.56-17.73-17.77-17.73q-201,0-402,0c-12.22,0-17.71,5.5-17.72,17.77q0,137.49,0,275c0,12.23,5.57,17.78,17.73,17.78q201,0,402,0c12.17,0,17.76-5.59,17.77-17.74q0-35.51,0-71v-5.13H5291c-41,0-82,.11-123,0-38.06-.15-69.63-30.53-70.93-67.94-1.35-39.13,30.72-72.7,69.92-72.86,41.33-.17,82.66,0,124,0Zm-.24,32.46a9.45,9.45,0,0,0-1.77-.41c-43.49,0-87-.17-130.48.14-11.39.08-21,5.36-27.89,14.49-9.47,12.5-11.1,26.3-4.29,40.43,7,14.61,19.41,21.64,35.42,21.71,41.66.16,83.32.05,125,0,1.28,0,2.55-.23,4-.37ZM5006.37,5192l.33.82h219c-1.11-2-1.92-3.61-2.85-5.13q-24.35-40.11-48.73-80.21c-5.72-9.42-10.37-10.62-19.63-5l-101.25,61.2Z"
        transform="translate(-4828.23 -5067.36)"
      />
      <path
        d="M5168.54,5360.81a11.62,11.62,0,1,1-.15,23.23,11.68,11.68,0,0,1-11.43-11.47A11.56,11.56,0,0,1,5168.54,5360.81Z"
        transform="translate(-4828.23 -5067.36)"
      />
    </svg>
  );
};

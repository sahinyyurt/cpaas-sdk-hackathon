import { create } from "@kandy-io/cpaas-sdk";
import { BASE_URL } from "../constants";
export const client = create({
  authentication: {
    server: {
      base: BASE_URL
    },
    clientCorrelator: "cpaas-sdk-hackathon-mobiletm"
  },
  call: {
    iceServers: [
      {
        urls: ["turns:turn-ucc-1.genband.com:443?transport=tcp"]
      },
      {
        urls: ["turns:turn-ucc-2.genband.com:443?transport=tcp"]
      }
    ]
  },
  subscription: {
    //channelLifetime: 120
  }
});

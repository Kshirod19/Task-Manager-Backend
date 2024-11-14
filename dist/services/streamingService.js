"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchStreamingData = void 0;
const axios_1 = __importDefault(require("axios"));
// Function to fetch streaming data from Twitch
const fetchStreamingData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get("https://api.twitch.tv/helix/streams", {
            headers: {
                "Client-ID": "n03hntq4cz8ly14bdr20peknwa0j9b", // Replace with your actual Twitch client ID
            },
        });
        return response.data.data; // Correctly typed: Stream[]
    }
    catch (error) {
        // More specific error handling
        if (error instanceof Error) {
            console.error("Error fetching streaming data:", error.message);
            throw new Error("Error fetching streaming data");
        }
        else {
            console.error("Unexpected error:", error);
            throw new Error("Error fetching streaming data");
        }
    }
});
exports.fetchStreamingData = fetchStreamingData;

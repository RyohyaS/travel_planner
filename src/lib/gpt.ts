import OpenAI from "openai";
import { get, writable } from "svelte/store";
import { isdebug } from "./store";

let openai: OpenAI;
const gptmodel = "gpt-3.5-turbo";

export function InitApi(apikey: string) {
  openai = new OpenAI({
    apiKey: apikey.trim(),
    dangerouslyAllowBrowser: true,
  });
}

const message0: OpenAI.Chat.Completions.ChatCompletionMessageParam = {
  role: "system",
  content: "You are a good trip advisor",
};

export const messages = writable<
  OpenAI.Chat.Completions.ChatCompletionMessageParam[]
>([message0]);

export function getLastResponse() {
  const msgArr = get(messages);
  const lastResponse = msgArr[msgArr.length - 1];
  return lastResponse.content;
}

export function resetMessages() {
  messages.set([message0]);
}

const trips_schema = {
  type: "object",
  properties: {
    plans: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          budget: {
            type: "string",
          },
          days: {
            type: "array",
            items: {
              type: "object",
              properties: {
                date: {
                  type: "string",
                  format: "date",
                },
                activities: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
              },
              required: ["date", "activities"],
            },
          },
        },
        required: ["name", "budget", "days"],
      },
    },
  },
  required: ["plans"],
};

// {
//   type: "object",
//   required: ["plans"],
//   properties: {
//     plans: {
//       type: "array",
//       items: {
//         type: "object",
//         properties: {
//           theme: { type: "string" },
//           days: {
//             type: "array",
//             activities: {
//               type: "array",
//               properties: {
//                 name: { type: "string" },
//               },
//               required: ["name", "unit", "amount", "need_to_buy"],
//             },
//           },
//         },
//       },
//     },
//   },
// };

async function getMockPlans() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    {
      name: "Plan 1",
      budget: "9000 USD",
      days: [
        {
          date: "2023-12-01",
          activities: [
            "Visit Tsukiji Fish Market",
            "Explore Asakusa",
            "Try sushi at a local restaurant",
          ],
        },
        {
          date: "2023-12-02",
          activities: [
            "Visit Meiji Shrine",
            "Shop in Harajuku",
            "Try street food at Takeshita Street",
          ],
        },
        {
          date: "2023-12-03",
          activities: [
            "Visit Tokyo Disneyland",
            "Enjoy rides and shows",
            "Try themed snacks",
          ],
        },
        {
          date: "2023-12-04",
          activities: [
            "Visit Shibuya Crossing",
            "Shop in Shibuya",
            "Try ramen at Ichiran",
          ],
        },
        {
          date: "2023-12-05",
          activities: [
            "Visit Tokyo Tower",
            "Explore Roppongi",
            "Try traditional Japanese tea",
          ],
        },
      ],
    },
    {
      name: "Plan 2",
      budget: "9000 USD",
      days: [
        {
          date: "2023-12-01",
          activities: [
            "Visit Tsukiji Fish Market",
            "Explore Asakusa",
            "Try sushi at a local restaurant",
          ],
        },
        {
          date: "2023-12-02",
          activities: [
            "Visit Meiji Shrine",
            "Shop in Harajuku",
            "Try street food at Takeshita Street",
          ],
        },
        {
          date: "2023-12-03",
          activities: [
            "Visit Tokyo Disneyland",
            "Enjoy rides and shows",
            "Try themed snacks",
          ],
        },
        {
          date: "2023-12-04",
          activities: [
            "Visit Akihabara",
            "Explore electronic shops",
            "Try maid cafe",
          ],
        },
        {
          date: "2023-12-05",
          activities: [
            "Visit Tokyo Tower",
            "Explore Roppongi",
            "Try traditional Japanese tea",
          ],
        },
      ],
    },
    {
      name: "Plan 3",
      budget: "9000 USD",
      days: [
        {
          date: "2023-12-01",
          activities: [
            "Visit Tsukiji Fish Market",
            "Explore Asakusa",
            "Try sushi at a local restaurant",
          ],
        },
        {
          date: "2023-12-02",
          activities: [
            "Visit Meiji Shrine",
            "Shop in Harajuku",
            "Try street food at Takeshita Street",
          ],
        },
        {
          date: "2023-12-03",
          activities: [
            "Visit Tokyo Disneyland",
            "Enjoy rides and shows",
            "Try themed snacks",
          ],
        },
        {
          date: "2023-12-04",
          activities: [
            "Visit Shinjuku Gyoen National Garden",
            "Explore Shinjuku",
            "Try yakitori at Omoide Yokocho",
          ],
        },
        {
          date: "2023-12-05",
          activities: [
            "Visit Tokyo Tower",
            "Explore Roppongi",
            "Try traditional Japanese tea",
          ],
        },
      ],
    },
  ];
}

export type Preference = {
  home_location: string;
  destination: string;
  dates: { from: Date; to: Date };
  travelers: { adults: number; teens: number; children: number };
  activities: string[];
  budget: {
    amount: number;
    currency: "";
    include_flight: boolean;
  };
};

export async function getPlans(preference: Preference) {
  const activities = preference.activities
    .map((i) => i.trim())
    .filter((i) => i)
    .join(", ");
  const promptString = `
    I am planning to go to ${preference.destination}
    from ${preference.dates.from} to ${preference.dates.to}.
    I am interested in ${activities}.
    With a maximum budget of ${preference.budget.amount} ${
    preference.budget.currency
  }
    ${preference.budget.include_flight ? "Including" : "excluding"}
    the transportation fee from ${preference.home_location}.
    Can you build me a day to day plan of what and where
    I can go to enjoy my trip to the maximum?
    I want to have 2 or 3 choices.`;
  // if (get(isdebug)) return await getMockPlans();
  const message = await getGptResponse(promptString, {
    functions: [{ name: "set_trips", parameters: trips_schema }],
    function_call: { name: "set_trips" },
  });
  console.log({ body: message });
  const itinerary = JSON.parse(message.function_call?.arguments ?? "{}");
  console.log({ plans: itinerary.plans });
  return itinerary.plans;
}

export async function getGptResponse(
  query: string,
  options: Partial<OpenAI.ChatCompletionCreateParamsNonStreaming>
) {
  messages.update((msg) => [...msg, { role: "user", content: query }]);
  console.log(messages);
  try {
    const completion: OpenAI.ChatCompletion =
      await openai.chat.completions.create({
        model: gptmodel,
        messages: get(messages),
        temperature: 0,
        ...options,
      });
    console.log(completion);
    const message = completion.choices[0].message;
    messages.update((msg) => [...msg, message]);
    return message;
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
      throw new Error(error.response.data.error.message);
    } else {
      console.log(error.message);
      throw new Error(error.message);
    }
  }
}

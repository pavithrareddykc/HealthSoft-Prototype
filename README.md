# MonoHome IoT

A stark, minimalist black and white smart home controller designed with a neo-brutalist aesthetic. This application leverages the power of Google's Gemini API to provide intelligent, natural language command processing for IoT devices.

## Features

- **Neo-Brutalist Design**: High contrast, bold typography, and thick borders for a distinct visual identity.
- **Smart Commands (AI)**: Integrated with Google Gemini to interpret natural language commands (e.g., "Turn off all lights in the living room").
- **Device Management**: Interactive controls for lights, thermostats, locks, speakers, and fans.
- **Room Filtering**: Easily filter devices by room location.
- **Secure Access**: Mock authentication screen with a custom visual style.
- **Responsive Mobile View**: Optimized for mobile form factors.

## Tech Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google GenAI SDK (`@google/genai`)
- **Icons**: Lucide React
- **Font**: Space Grotesk

## Setup

This project is designed to run in a web container environment.

### API Key Configuration

To use the Smart Command feature, you must have a valid Google Gemini API Key available in the environment variables as `process.env.API_KEY`.

## Usage

1. **Login**: Enter any username and password to bypass the mock login screen.
2. **Control Devices**: Use toggles and sliders to manage device states manually.
3. **Smart Command**: Click the "Smart Command" button (microphone icon) to type natural language instructions.
   - Example: *"Set the thermostat to 24 degrees"*
   - Example: *"Lock the front door and turn off the kitchen spots"*

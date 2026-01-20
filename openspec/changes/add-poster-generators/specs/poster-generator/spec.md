## ADDED Requirements
### Requirement: Custom Slogan Editor
The system SHALL provide an interface for users to create a custom campaign poster by overlaying text on a candidate image.
The system MUST use `public/base.webp` as the base image for the poster generation.

#### Scenario: Text updates in preview
- **WHEN** the user types text into the "Message" input field
- **THEN** the text overlay on the poster preview updates in real-time.

#### Scenario: Character limit enforcement
- **WHEN** the user attempts to type more than the allowed character limit (e.g., 40 characters)
- **THEN** the input prevents further entry or indicates the limit has been reached.

#### Scenario: Reset functionality
- **WHEN** the user clicks the "Reset" button
- **THEN** the text input and preview revert to their default states.

### Requirement: Supporter Card Generator
The system SHALL provide an interface for users to generate a personalized "Supporter Card" incorporating their name into an official design.

#### Scenario: Name personalization
- **WHEN** the user enters their name in the input field (e.g., "Carlos")
- **THEN** the supporter card displays the name followed by the phrase "VOTA POR XAVIER" (e.g., "CARLOS VOTA POR XAVIER").

#### Scenario: Default state
- **WHEN** the user loads the generator
- **THEN** the input field displays a default or placeholder name (e.g., "Carlos" or "Escribe tu nombre").

### Requirement: Image Generation and Download
The system SHALL allow users to download the customized poster or card as an image file.

#### Scenario: Download image
- **WHEN** the user clicks the "Download" or "Save" button
- **THEN** the browser initiates a download of the current preview as an image file (e.g., PNG or JPG).

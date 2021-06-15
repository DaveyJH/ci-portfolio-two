# Design Notes

General notes regarding the initial concept, layout and features of the Mastermind game.
#
## Strategy

- Who is it for?
  - **People who like logic games**
  - **People who want to see my coding capabiities**
  - What content is relevant?
    - **Rules for the game**
    - **The game itself**
    - **A brief section on me as a developer**
- What else is available?
  - **Many other versions online**
  - What is good in those versions?
    - **Scaleable difficulty**
    - **Alert if selections not completed**
  - What is not good in those versions?
    - **Text heavy content**
    - **Very basic styling**
    - **Drag and drop!!**
    - **Unclear order of play**

### User Considerations
*The majorioty of users will fall into the consumer category, with that in mind, the site should allow quick access to the game. It should require minor input to view the rules and change the difficulty levels.<br>
The developer section will be more targeted toward the business category and so may involve a little more input from the user. It should maintain the style of the site but should also portray a slightly more professional approach with links to learn more if desired.*

#


## Rules

- Correctly identify the colours and the order of a number of coloured circles
- Correct colours in the wrong place generate a white peg response
- Correct colours in the correct place generate a black peg response
- Complete the correct colour and order to win

## Difficulties

- Number of coloured circles
- Number of possible colours
- Whether colours may be repeated within the solution
- Whether the player may repeat colour selections if the solution is not allowed repeats

## Design Considerations

- Colour options
  - Contrast should be high enough that it doesn't cause confusion
  - Hovering over a colour should display its name for a visual aid
- Layout of game
  - Solution 'hidden' under a covering element which can animate away on correct solution/give up
  - Pegs responses should be aligned to make it clear which attempt they relate to
    - Pop up to explain the result? Hover/click result for more explanation?
  - Selecting a position should reveal possible colours to choose from
    - Difficulty option could remove already selected colours from choices or could be alerted with a pop-up
- Brain image/favicon
- Display number of guesses
  - Fewest guesses to solution for current difficulty level
  - Reward for fewer guesses
- Display time to complete/average time per guess
  - Pause function (would need overlay to cover current game)
- Rules page
- Demo game page
- About the developer page


## Importance/Viability Trade Offs
List of desired features and ability to deliver those features

| Desired Feature | Importance /10 | Viability /10 |
| :-----: | :--------: | :-------: |
| Option to select number of colours | 7/10 | 8/10 |
| Option to select number of circles in solution | 10/10 | 8/10 |
| Option to select if colours may be repeated within solution | 7/10 | 7/10 |
| Option to repeat colours in guess if solution has no repeats | 5/10 | 6/10 |
| Display result of each guess | 10/10 | 8/10 |
| Pop up to remind meaning of results | 2/10 | 5/10 |
| Hidden solution that reveals on correct answer/give up | 6/10 | 6/10 |
| Score count | 7/10 | 9/10 |
| Best score display | 4/10 | 8/10 |
| Timers | 4/10 | 5/10 |
| Pause function | 2/10 | 4/10 |
| Rules | 10/10 | 10/10 |
| Demo game | 5/10 | 8/10 |
| Developer section | 9/10 | 10/10 |
| Stop guess if not all selections made | 9/10 | 8/10 |
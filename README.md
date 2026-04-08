# Visualize Data with a Treemap Diagram

[![Deploy to GitHub Pages](https://github.com/BenOnSocial/visualize-data-with-a-treemap-diagram/actions/workflows/deploy.yml/badge.svg)](https://github.com/BenOnSocial/visualize-data-with-a-treemap-diagram/actions/workflows/deploy.yml)

This project is part of my [Data Visualization V8 certification from freeCodeCamp](https://www.freecodecamp.org/certification/benonsocial/data-visualization).

https://github.com/user-attachments/assets/b1cd336a-42b1-42a4-a383-6158ff576d52

## Objective

Build an app that is functionally similar to this: https://treemap-diagram.freecodecamp.rocks.

Fulfill the below user stories and get all of the tests to pass. Use whichever libraries or APIs you need. Give it your own personal style.

You can use HTML, JavaScript, CSS, and the D3 svg-based visualization library. The tests require axes to be generated using the D3 axis property, which automatically generates ticks along the axis. These ticks are required for passing the D3 tests because their positions are used to determine alignment of graphed elements. You will find information about generating axes at https://d3js.org/d3-axis. Required DOM elements are queried on the moment of each test. If you use a front-end framework (like Vue for example), the test results may be inaccurate for dynamic content. We hope to accommodate them eventually, but these frameworks are not currently supported for D3 projects.

## User Stories

1. My tree map should have a title with a corresponding `id="title"`.

2. My tree map should have a description with a corresponding `id="description"`.

3. My tree map should have `rect` elements with a corresponding `class="tile"` that represent the data.

4. There should be at least 2 different fill colors used for the tiles.

5. Each tile should have the properties `data-name`, `data-category`, and `data-value` containing their corresponding `name`, `category`, and `value`.

6. The area of each tile should correspond to the `data-value` amount: tiles with a larger `data-value` should have a bigger area.

7. My tree map should have a legend with corresponding `id="legend"`.

8. My legend should have `rect` elements with a corresponding `class="legend-item"`.

9. The `rect` elements in the legend should use at least 2 different fill colors.

10. I can mouse over an area and see a tooltip with a corresponding `id="tooltip"` which displays more information about the area.

11. My tooltip should have a `data-value` property that corresponds to the `data-value` of the active area.

## Datasets used in this project

- Kickstarter Pledges:

  https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json

- Movie Sales:

  https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json

- Video Game Sales:

  https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json

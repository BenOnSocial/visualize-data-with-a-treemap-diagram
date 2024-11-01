let data;
let title;
let description;

const params = new URL(window.location.toString()).searchParams;

Array.from(document.getElementsByClassName('nav-link')).forEach((el) => {
  el.classList.remove('active');
});

if (params.get('data') === 'movies') {
  data = await d3.json(
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json'
  );
  title = 'Movie Sales';
  description = 'Top 100 Highest Grossing Movies Grouped By Genre';
  document.getElementById('movies').classList.add('active');
} else if (params.get('data') === 'videogames') {
  data = await d3.json(
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json'
  );
  title = 'Video Game Sales';
  description = 'Top 100 Most Sold Video Games Grouped by Platform';
  document.getElementById('videogames').classList.add('active');
} else {
  data = await d3.json(
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json'
  );
  title = 'Kickstarter Pledges';
  description =
    'Top 100 Most Pledged Kickstarter Campaigns Grouped By Category';
  document.getElementById('kickstarter').classList.add('active');
}

document.getElementById('title').textContent = title;
document.getElementById('description').textContent = description;

const svgDim = { margin: 50, width: 1154, height: 1154 };
const elements = {};

elements.svg = d3
  .select('main')
  .append('svg')
  .attr('width', svgDim.width + svgDim.margin)
  .attr('height', svgDim.height + 2 * svgDim.margin);

const color = createColorScale();
createTooltip();
createTreemap();
createLegend();

function createColorScale() {
  return d3.scaleOrdinal(
    data.children.map((d) => d.name),
    d3.schemeObservable10
  );
}
function createTreemap() {
  // Compute the layout.
  elements.root = d3
    .treemap()
    .tile(d3.treemapSquarify)
    .size([svgDim.width, svgDim.height])
    .padding(1)
    .round(false)(
    d3
      .hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value)
  );
  const leaf = elements.svg
    .selectAll('g')
    .data(elements.root.leaves())
    .join('g')
    .attr('transform', (d) => `translate(${d.x0},${d.y0})`);

  const format = d3.format(',d');

  // Append a color rectangle.
  leaf
    .append('rect')
    .attr('class', 'tile')
    .attr('data-name', (d) => d.data.name)
    .attr('data-category', (d) => d.data.category)
    .attr('data-value', (d) => d.data.value)
    .attr('fill', (d) => {
      while (d.depth > 1) d = d.parent;
      return color(d.data.name);
    })
    .attr('fill-opacity', 0.6)
    .attr('width', (d) => d.x1 - d.x0)
    .attr('height', (d) => d.y1 - d.y0)
    .on('mouseover', (event, d) => {
      elements.tooltip.transition().duration(200).style('opacity', 1);
      elements.tooltip
        .html(`Name: ${d.data.name}<br>Value: ${d.data.value}`)
        .attr('data-value', d.data.value)
        .style('left', event.pageX + 5 + 'px')
        .style('top', event.pageY - 28 + 'px');
    })
    .on('mouseout', () => {
      elements.tooltip.transition().duration(200).style('opacity', 0);
    });

  // Append multiline text. The last line shows the value and has a specific formatting.
  leaf
    .append('text')
    .attr('clip-path', (d) => d.clipUid)
    .attr('font-size', '.85em')
    .selectAll('tspan')
    .data((d) =>
      d.data.name.split(/(?=[A-Z][a-z])|\s+/g).concat(format(d.value))
    )
    .join('tspan')
    .attr('x', 3)
    .attr(
      'y',
      (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`
    )
    .attr('fill-opacity', (d, i, nodes) =>
      i === nodes.length - 1 ? 0.7 : null
    )
    .text((d) => d);
}

function createTooltip() {
  elements.tooltip = d3.select('#tooltip');
}

function createLegend() {
  const categories = [...new Set(data.children.map((d) => d.name))];

  elements.legend = d3
    .select('main')
    .append('svg')
    .attr('id', 'legend')
    .attr('width', 500)
    .attr('height', categories.length * 20);

  elements.legend
    .append('g')
    .attr('transform', `translate(${500 + 20}, ${20})`);

  categories.forEach((category, i) => {
    elements.legend
      .append('rect')
      .attr('class', 'legend-item')
      .attr('x', 0)
      .attr('y', i * 30)
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', d3.schemeCategory10[i % 10]);

    elements.legend
      .append('text')
      .attr('x', 30)
      .attr('y', i * 30 + 15)
      .text(category)
      .attr('font-size', '12px')
      .attr('fill', 'black');
  });
}




//set colours

const white = '#ffffff'; 
const black = '#000000';
const grey10 = '#f4f4f4';
const grey20 = '#e0e0e0';
const grey30 = '#c6c6c6';
const grey40 = '#a8a8a8';
const grey50 = '#8d8d8d';
const grey60 = '#6f6f6f';
const grey70 = '#4d5358';
const grey80 = '#393939';
const grey90 = '#262626';
const grey100 = '#161616';

const blue60 = '#6464c8';
const red60 = '#be4747';
const green30 = '#64df64';
const yellow10 = '#e9e943';

// Read in and parse input dataset

const inputFile = '002-data-to-plot.csv';


d3.csv(inputFile) 
  .then(data => {

    console.log(data)

    //below is copied from https://observablehq.com/@d3/parallel-sets?collection=@d3/d3-sankey
    //read in data and create a "inputNodes" and "inputLinks" objects
    
    const keys = data.columns.slice(0, -1);
    let index = -1;
    const inputNodes = [];
    const nodeByKey = new d3.InternMap([], JSON.stringify);;
    const indexByKey = new d3.InternMap([], JSON.stringify);;
    const inputLinks = [];
    
    for (const k of keys) {
      for (const d of data) {
        const key = [k, d[k]];
        if (nodeByKey.has(key)) continue;
        const node = {name: d[k]};
        inputNodes.push(node);
        nodeByKey.set(key, node);
        indexByKey.set(key, ++index);
      }
    }
    
    for (let i = 1; i < keys.length; ++i) {
      const a = keys[i - 1];
      const b = keys[i];
      const prefix = keys.slice(0, i + 1);
      const linkByKey = new d3.InternMap([], JSON.stringify);
      for (const d of data) {
        const names = prefix.map(k => d[k]);
        const value = d.value || 1;
        let link = linkByKey.get(names);
        if (link) { link.value += value; continue; }
        link = {
          source: indexByKey.get([a, d[a]]),
          target: indexByKey.get([b, d[b]]),
          names,
          value
        };
        inputLinks.push(link);
        linkByKey.set(names, link);
      }
    }
    console.log(inputNodes);
    console.log(inputLinks);

    //borders
    // x = largest font size = 16 px
    // h = line height of x = 24 px
    // padding left, right, bottom = x = 16px
    // padding top = x + x/h = 16/24 = 0.7px (too small I will ignore)

    guideLines = [  {"id":"top" ,"x1":0 ,    "y1":48  , "x2":1200    ,   "y2":48},
                    {"id":"bot" ,"x1":0 ,    "y1":1152  , "x2":1200    ,   "y2":1152},
                    {"id":"left" ,"x1":48 ,    "y1":0  , "x2":48    ,   "y2":1200},
                    {"id":"right" ,"x1":1152 ,    "y1":0  , "x2":1152    ,   "y2":1200},
                  /* 
                    {"id":"biomarker" ,"x1":52 ,    "y1":0  , "x2":52    ,   "y2":1200},
                    {"id":"sample" ,"x1":271 ,    "y1":0  , "x2":271    ,   "y2":1200},
                    {"id":"analyte" ,"x1":491 ,    "y1":0  , "x2":491    ,   "y2":1200},
                    {"id":"assay" ,"x1":710 ,    "y1":0  , "x2":710    ,   "y2":1200},
                    {"id":"therapy" ,"x1":928 ,    "y1":0  , "x2":928    ,   "y2":1200},
                    {"id":"manufacturer" ,"x1":1148 ,    "y1":0  , "x2":1148    ,   "y2":1200},
                    
                    {"id":"pattern-line" ,"x1":0 ,    "y1":60  , "x2":1200    ,   "y2":60}, //12 px = 16px line height (use half = 4 as pattern is at top)
                    {"id":"pattern-gap-xs" ,"x1":0 ,    "y1":66  , "x2":1200    ,   "y2":66}, //gap-xs 0.128em on 16px = 2px 

                    {"id":"h1-line" ,"x1":0 ,    "y1":138  , "x2":1200    ,   "y2":138}, // 16px font = 24px  line
                    {"id":"h1-gap-xs" ,"x1":0 ,    "y1":147  , "x2":1200    ,   "y2":147}, //gp-xs 0.128em on 24px = 3px;
                    
                    {"id":"h2-line" ,"x1":0 ,    "y1":201  , "x2":1200    ,   "y2":201}, // 14px font = 18px line
                    {"id":"h2-gap-l" ,"x1":0 ,    "y1":255  , "x2":1200    ,   "y2":255}, //gap-l = 1em of previous 18px

                    {"id":"h3-line" ,"x1":0 ,    "y1":309  , "x2":1200    ,   "y2":309},  //14px font = 18px line
                    {"id":"h3-gap-xs" ,"x1":0 ,    "y1":315  , "x2":1200    ,   "y2":315},//gap-xs = 0.128em of 18px = 2px 

                    {"id":"h4-line" ,"x1":0 ,    "y1":363  , "x2":1200    ,   "y2":363},  //12px font = 16px line height
                    {"id":"h4-gap-l" ,"x1":0 ,    "y1":411  , "x2":1200    ,   "y2":411},  //gap-l = 1em of 16px
                    
                    {"id":"bot" ,"x1":0 ,    "y1":1096  , "x2":1200    ,   "y2":1096}
*/
                    ];

    const guideLines2 = [7, 242, 480, 718, 956, 1192] ;

    // make SVG

    const width = 1200;
    const height = 1200;
    marginLeft = 48;
    marginRight= 48 ;
    marginBottom= 48 ;

    var svgContainer = d3.select("body")
        .append("svg")
        .attr("height", 1200)
        .attr("width", 1200)
        .attr("id","002")
        .style("background-color", white)
    ;

    d3.select("svg")
      .append('defs')
      .append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', [0, 0, 12, 12])
      .attr('refX', 6)
      .attr('refY', 6)
      .attr('markerWidth', 12)
      .attr('markerHeight', 12)
      .attr('orient', 'auto-start-reverse')
      .append('path')
      // .attr('d',"M2,2 L10,6 L2,10 L6,6 L2,2")
      .attr("d","M 0 0 L 12 6 L 0 12 z")
      .attr('stroke', grey60)
      .attr('fill', grey60)

    ;

    // Add Grid lines
    var lines = 
    svgContainer.selectAll("line")
    .data(guideLines)
    .enter()
    .append("line")
    ;

    lines.attr("x1",i => { return i.x1; })
        .attr("y1",i => { return i.y1; })
        .attr("x2",i => { return i.x2; })
        .attr("y2",i => { return i.y2; })
        //.attr("stroke", "red")
        .attr("stroke-width", 1)
        ;
/*
    // Add Pattern x= 255 x y 24 px
    const pattern  = "M23 24H26V0H23V24ZM50 24H53V0H50V24ZM62 24H68V0H62V24ZM71 24H74V0H71V24ZM77 24H80V0H77V24ZM104 24H107V0H104V24ZM113 24H116V0H113V24ZM122 24H128V0H122V24ZM131 24H134V0H131V24ZM158 24H161V0H158V24ZM167 24H179V0H167V24ZM185 24H188V0H185V24ZM194 24H197V0H194V24ZM206 24H209V0H206V24ZM212 24H218V0H212V24ZM221 24H236V0H221V24ZM239 24H242V0H239V24ZM245 24H257V0H245V24ZM140 24H143V0H140V24ZM146 24H152V0H146V24ZM86 24H89V0H86V24ZM92 24H98V0H92V24ZM32 24H44V0H32V24ZM2 24H8V0H2V24ZM11 24H14V0H11V24ZM0 24H1V0H0V24ZM27 24H28V0H27V24ZM54 24H55V0H54V24ZM57 24H58V0H57V24ZM60 24H61V0H60V24ZM69 24H70V0H69V24ZM81 24H82V0H81V24ZM84 24H85V0H84V24ZM90 24H91V0H90V24ZM99 24H100V0H99V24ZM108 24H109V0H108V24ZM111 24H112V0H111V24ZM117 24H118V0H117V24ZM120 24H121V0H120V24ZM135 24H136V0H135V24ZM138 24H139V0H138V24ZM144 24H145V0H144V24ZM153 24H154V0H153V24ZM162 24H163V0H162V24ZM165 24H166V0H165V24ZM180 24H181V0H180V24ZM189 24H190V0H189V24ZM192 24H193V0H192V24ZM198 24H199V0H198V24ZM201 24H202V0H201V24ZM204 24H205V0H204V24ZM219 24H220V0H219V24ZM243 24H244V0H243V24ZM30 24H31V0H30V24ZM45 24H46V0H45V24ZM9 24H10V0H9V24ZM15 24H16V0H15V24ZM18 24H19V0H18V24Z";

    d3.select("svg")
        .append("path")
        .attr("d",pattern)
        .attr("fill", blue60)
        .attr("transform", "translate(48,0) scale(2)")
        ;
    // Add Logo
    const logo     = "M60.0336 10.9786L59.759 8.80236H57.1602V20H60.1604V14.211C60.4971 12.706 61.0337 11.4011 62.5689 11.4011C62.8362 11.4011 63.1673 11.4502 63.5618 11.5485L64.0688 8.65401C63.66 8.54198 63.2872 8.48498 62.9492 8.48498C61.4967 8.48498 60.5009 9.5992 60.0336 10.9786ZM65.5479 20H68.548V8.80236H65.5479V20ZM67.0266 3.68268C65.9235 3.68268 65.2095 4.44463 65.2095 5.43646C65.2095 6.43618 65.9331 7.19024 67.0266 7.19024C68.1242 7.19024 68.8649 6.4315 68.8649 5.43646C68.8649 4.44192 68.1262 3.68268 67.0266 3.68268ZM49.871 8.46438C48.5048 8.46438 47.1244 8.73848 45.7302 9.28769L46.4062 11.295C47.5891 10.901 48.5751 10.7035 49.364 10.7035C50.8855 10.7035 51.3713 11.2493 51.3713 12.5417V13.091H50.0822C47.2783 13.091 44.927 14.0665 44.927 16.8727C44.927 18.8636 46.258 20.338 48.5613 20.338C49.8495 20.338 50.835 19.8968 51.5568 19.0719L51.7093 20H54.308C54.308 19.862 54.308 11.8715 54.308 12.3728C54.308 9.55819 52.6528 8.46438 49.871 8.46438ZM51.3713 16.9366C50.8923 17.7678 50.2301 18.1824 49.3851 18.1824C48.4147 18.1824 47.9482 17.563 47.9482 16.6192C47.9482 15.4078 48.7583 14.8025 50.378 14.8025H51.3713V16.9366ZM78.7312 3.68268C77.6283 3.68268 76.9141 4.44451 76.9141 5.43646C76.9141 6.43618 77.6377 7.19024 78.7312 7.19024C79.8291 7.19024 80.5695 6.43131 80.5695 5.43646C80.5695 4.44419 79.8329 3.68268 78.7312 3.68268ZM100.873 8.46438C99.4262 8.46438 98.3543 9.09567 97.4505 10.2172L97.2181 8.80236H94.6194V20H97.6195V12.2667C98.137 11.4342 98.7907 10.7035 99.7746 10.7035C100.755 10.7035 101 11.3715 101 12.3512V20H104V11.8442C104 9.77991 102.898 8.46438 100.873 8.46438ZM87.3302 8.46438C85.964 8.46438 84.5835 8.73848 83.1894 9.28769L83.8653 11.295C85.0483 10.901 86.0342 10.7035 86.8232 10.7035C88.3446 10.7035 88.8304 11.2493 88.8304 12.5417V13.091H87.5414C84.7374 13.091 82.3861 14.0665 82.3861 16.8727C82.3861 18.8637 83.7173 20.338 86.0204 20.338C87.3087 20.338 88.2941 19.8968 89.016 19.0719L89.1684 20H91.7672C91.7672 19.862 91.7672 11.8715 91.7672 12.3728C91.7672 9.55832 90.112 8.46438 87.3302 8.46438ZM88.8304 16.9366C88.3515 17.7678 87.6892 18.1824 86.8443 18.1824C85.8739 18.1824 85.4074 17.563 85.4074 16.6192C85.4074 15.4078 86.2175 14.8025 87.8371 14.8025H88.8304V16.9366ZM77.2526 20H80.2526V8.80236H77.2526V20ZM71.4003 19.9997H74.4003V3.99967H71.4003V19.9997ZM44.4201 8.80236H41.3144L37.7228 13.8731L41.3355 20H44.7369L40.8496 13.7247L44.4201 8.80236ZM34.6172 20H37.6172V3.99998H34.6172V20Z";

    d3.select("svg")
        .append("path")
        .attr("d",logo)
        .attr("fill", black)
        .attr("transform", "translate(942,1103) scale(2)")
        ;

    // Add Logo Type
    const logoType = "M4 24H5V17.0303L4 16.6633V24ZM6 24H21V22.9014L6 17.3972V24ZM22 24H23V23.6353L22 23.2684V24ZM0 24H3V16.2964L0 15.1956V24ZM18 0V2.1994L23.9938 0H18ZM17 0H16V2.93329L17 2.56635V0ZM15 0H6V6.60272L15 3.30023V0ZM4 7.33661L5 6.96967V0H4V7.33661ZM0 8.80438L3 7.70355V0H0V8.80438ZM20 19.3389V4.66107L19 5.02802V18.9719L20 19.3389ZM3 13.1008V10.8992L0 12L3 13.1008ZM17 5.7619L16 6.12885V17.8711L17 18.238V5.7619ZM21 4.29413V19.7058L24 20.8066V3.1933L21 4.29413ZM12 7.59668L6 9.79834V14.2017L12 16.4033V7.59668ZM14 17.1372V6.86273L13 7.22968V16.7703L14 17.1372ZM4 13.4678L5 13.8347V10.1653L4 10.5322V13.4678Z";

    d3.select("svg")
        .append("path")
        .attr("d",logoType)
        .attr("fill", blue60)
        .attr("transform", "translate(942,1103) scale(2)")
        ;


//Add H1
d3.select("svg")
.append("text")
.style("font-size","48px")
.style("font-weight","600")
.style("font-family","fira")
.style("fill",black)
.text("the Journey from biomarker to treatment")
.attr("transform", "translate(48, 117)")
.attr("class","h1")
;

//Add H2
d3.select("svg")
  .append("text")
  .style("font-size","42px")
  .style("font-weight","400")
  .style("font-family","fira")
  .style("fill",black)
  .text("connecting to treatment option is not as easy as you think")
  .attr("transform", "translate(48,186)")
  .attr("class","h2")
;

//Add H3
d3.select("svg")
    .append("text")
    .style("font-size","42px")
    .style("font-weight","600")
    .style("font-family","fira")
    .style("fill",black)
    .text("FDA approved therapies for EGFR biomarkers in NSCLC")
    .attr("transform", "translate(48,295)")
    .attr("class","h3")
;

//Add H4
d3.select("svg")
    .append("text")
    .style("font-size","36px")
    .style("font-weight","300")
    .style("font-family","fira")
    .style("fill", black)
    .text("sankey diagram of Dx workflow requirements for on-label use")
    .attr("transform", "translate(48,351)") 
    .attr("class","h4")
;
*/
//Add p
d3.select("svg")
    .append("text")
    .style("font-size","16px")
    .style("font-weight","600")
    .style("font-family","fira")
    .style("fill", black)
    .text("biomarker")
    .attr("transform", "translate(0 16)") 
    .attr("class","h4")
;


//Add p
d3.select("svg")
    .append("text")
    .style("font-size","16px")
    .style("font-weight","600")
    .style("font-family","fira")
    .style("fill", black)
    .text("manufacturer")
    .attr("transform", "translate(1100,16)") 
    .attr("class","h4")
;


//Add p
d3.select("svg")
    .append("text")
    .style("font-size","16px")
    .style("font-weight","600")
    .style("font-family","fira")
    .style("fill", black)
    .text("sample type")
    .attr("transform", "translate(196,16)") 
    .attr("class","h4")
;

//Add p
d3.select("svg")
    .append("text")
    .style("font-size","16px")
    .style("font-weight","600")
    .style("font-family","fira")
    .style("fill", black)
    .text("analyte detection")
    .attr("transform", "translate(420,16)") 
    .attr("class","h4")
;

//Add p
d3.select("svg")
    .append("text")
    .style("font-size","16px")
    .style("font-weight","600")
    .style("font-family","fira")
    .style("fill", black)
    .text("assay")
    .attr("transform", "translate(698,16)") 
    .attr("class","h4")
;

//Add p
d3.select("svg")
    .append("text")
    .style("font-size","16px")
    .style("font-weight","600")
    .style("font-family","fira")
    .style("fill", black)
    .text("therapy")
    .attr("transform", "translate(928,16)") 
    .attr("class","h4")
;

/*
//Add Source Info
d3.select("svg")
    .append("text")
    .style("font-size","36px")
    .style("font-weight","300")
    .style("font-family","fira")
    .style("fill",grey40)
    .text("Source: FIND+CONNECT: www.karilian.com")
    .attr("transform", "translate(48,1142)") 
    .attr("class","h4")
;
*/

    // make Sankey
    const sankey = d3.sankey()
      .nodeSort(null)
      .linkSort(null)
      .nodeWidth(10)
      .nodePadding(10)
      .extent([[0, 64], [width, height ]])
    ;
    
    //read in nodes and links created above
    const {nodes, links} = sankey({
      nodes: inputNodes.map(d => Object.create(d)),
      links: inputLinks.map(d => Object.create(d))
    });

    console.log(nodes);
    console.log(links);
    
    //set colours
    const purple30hover = '#c5a3ff';
    const red30hover = '#ff99a0';
    const green20hover = '#74e792';
    const yellow10 = '#fafa77';
    const orange30hover = '#ff9d57';
    const blue40hover = '#5c97ff';
    const magenta20hover = '#ffbdda';
    
    const color = d3.scaleOrdinal(
                      ["exon19del", "exon21-L858R", "exon20ins","G719X","L861Q","S768I","T790M"], 
                      [purple30hover, red30hover, green20hover, yellow10, orange30hover,blue40hover, magenta20hover]
  
                    ).unknown(grey10);

    //plot the nodes
    svgContainer.append("g")
      .selectAll("rect")
      .data(nodes)
      .join("rect")
        .attr("x", d => d.x0)
        .attr("y", d => d.y0)
        .attr("height", d => d.y1 - d.y0)
        .attr("width", d => d.x1 - d.x0)
        .style("fill",grey90)
      .append("title")
        .text(d => `${d.name}\n${d.value.toLocaleString()}`)
        ;

    d3.select("svg")
    .append('path')
    .attr('d', d3.line()([[7, 40], [230, 40]]))
          .attr('stroke', grey60)
          .attr('marker-end', 'url(#arrow)')
    ;

    d3.select("svg")
    .append('path')
    .attr('d', d3.line()([[242, 40], [468, 40]]))
          .attr('stroke', grey60)
          .attr('marker-end', 'url(#arrow)')
    ;

    d3.select("svg")
    .append('path')
    .attr('d', d3.line()([[480, 40], [706, 40]]))
          .attr('stroke', grey60)
          .attr('marker-end', 'url(#arrow)')
    ;

    d3.select("svg")
    .append('path')
    .attr('d', d3.line()([[718, 40], [944, 40]]))
          .attr('stroke', grey60)
          .attr('marker-end', 'url(#arrow)')
    ;

    d3.select("svg")
    .append('path')
    .attr('d', d3.line()([[956, 40], [1180, 40]]))
          .attr('stroke', grey60)
          .attr('marker-end', 'url(#arrow)')
    ;


    svgContainer.append("g")
          .selectAll("g")
          .data(guideLines2)
          .join("circle")
            .attr("cx", d => d)
            .attr("cy", d => 40)
            .attr("r", 7 )
            .style("fill",black)
        ;



    //plot the links
    svgContainer.append("g")
      .attr("fill", "none")
      .selectAll("g")
      .data(links)
      .join("path")
        .attr("d", d3.sankeyLinkHorizontal())
        .attr("stroke", d => color(d.names[0]))
        .attr("stroke-width", d => d.width)
        .style("mix-blend-mode", "multiply")
      .append("title")
        .text(d => `${d.names.join(" → ")}\n${d.value.toLocaleString()}`)
      ;
    
    //plot the text 
    svgContainer.append("g")
      .style("font-size", "16px")
      .style("font-family", "fira")
      .style("font-weight", "400")
      .style("fill", grey90)
      .selectAll("text")
      .data(nodes)
      .join("text")
        .attr("x", d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
        .attr("y", d => (d.y1 + d.y0) / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
        .text(d => d.name)
      .append("tspan")
        .attr("fill-opacity", 0.7)
        .text(d => ` ${d.value.toLocaleString()}`)
      ;
    

  })
  .catch(error => {
    console.error('Error reading file:', error);
});


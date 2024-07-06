// Read in and parse input dataset

const inputFile = '001-data-to-plot.csv';

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



d3.csv(inputFile) 
  .then(data => {
    const parseDate = d3.timeParse("%m/%d/%Y");
    data.forEach(row => {
      row.date = parseDate(row.date);
      row.IHC = +row.IHC;
      row.NGS = +row.NGS;
      row.PCR = +row.PCR;
    });

    /*
    //borders
    // x = largest font size = 16 px
    // h = line height of x = 24 px
    // padding left, right, bottom = x = 16px
    // padding top = x + x/h = 16/24 = 0.7px (too small I will ignore)

    guideLines = [  {"id":"top" ,"x1":0 ,    "y1":16  , "x2":400    ,   "y2":16},
                    {"id":"bot" ,"x1":0 ,    "y1":384  , "x2":400    ,   "y2":384},
                    {"id":"left" ,"x1":16 ,    "y1":0  , "x2":16    ,   "y2":400},
                    {"id":"right" ,"x1":384 ,    "y1":0  , "x2":384    ,   "y2":400},
                    
                    {"id":"pattern-line" ,"x1":0 ,    "y1":20  , "x2":400    ,   "y2":20}, //12 px = 16px line height (use half = 4 as pattern is at top)
                    {"id":"pattern-gap-xs" ,"x1":0 ,    "y1":22  , "x2":400    ,   "y2":22}, //gap-xs 0.128em on 16px = 2px 

                    {"id":"h1-line" ,"x1":0 ,    "y1":46  , "x2":400    ,   "y2":46}, // 16px font = 24px  line
                    {"id":"h1-gap-xs" ,"x1":0 ,    "y1":49  , "x2":400    ,   "y2":49}, //gp-xs 0.128em on 24px = 3px;
                    
                    {"id":"h2-line" ,"x1":0 ,    "y1":67  , "x2":400    ,   "y2":67}, // 14px font = 18px line
                    {"id":"h2-gap-l" ,"x1":0 ,    "y1":85  , "x2":400    ,   "y2":85}, //gap-l = 1em of previous 18px

                    {"id":"h3-line" ,"x1":0 ,    "y1":103  , "x2":400    ,   "y2":103},  //14px font = 18px line
                    {"id":"h3-gap-xs" ,"x1":0 ,    "y1":105  , "x2":400    ,   "y2":105},//gap-xs = 0.128em of 18px = 2px 

                    {"id":"h4-line" ,"x1":0 ,    "y1":121  , "x2":400    ,   "y2":121},  //12px font = 16px line height
                    {"id":"h4-gap-l" ,"x1":0 ,    "y1":137  , "x2":400    ,   "y2":137}  //gap-l = 1em of 16px

                    ];
*/

    // make SVG
    var svgContainer = 
        d3.select("body")
        .append("svg")
        .attr("id", "001")
        .attr("height", 400)
        .attr("width", 400)
        .style("background-color", white)

    ;
/*

    d3.select("svg")
    .append("rect")
    .attr("x","16")
    .attr("y","16")
    .attr("width","368")
    .attr("height","368")
    .style("fill", grey10)
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
        .attr("stroke", "#e0e0e0")
        .attr("stroke-width", 1)
        ;
    

    
    // Add Pattern x= 255 x y 24 px
    const pattern  = "M23 24H26V0H23V24ZM50 24H53V0H50V24ZM62 24H68V0H62V24ZM71 24H74V0H71V24ZM77 24H80V0H77V24ZM104 24H107V0H104V24ZM113 24H116V0H113V24ZM122 24H128V0H122V24ZM131 24H134V0H131V24ZM158 24H161V0H158V24ZM167 24H179V0H167V24ZM185 24H188V0H185V24ZM194 24H197V0H194V24ZM206 24H209V0H206V24ZM212 24H218V0H212V24ZM221 24H236V0H221V24ZM239 24H242V0H239V24ZM245 24H257V0H245V24ZM140 24H143V0H140V24ZM146 24H152V0H146V24ZM86 24H89V0H86V24ZM92 24H98V0H92V24ZM32 24H44V0H32V24ZM2 24H8V0H2V24ZM11 24H14V0H11V24ZM0 24H1V0H0V24ZM27 24H28V0H27V24ZM54 24H55V0H54V24ZM57 24H58V0H57V24ZM60 24H61V0H60V24ZM69 24H70V0H69V24ZM81 24H82V0H81V24ZM84 24H85V0H84V24ZM90 24H91V0H90V24ZM99 24H100V0H99V24ZM108 24H109V0H108V24ZM111 24H112V0H111V24ZM117 24H118V0H117V24ZM120 24H121V0H120V24ZM135 24H136V0H135V24ZM138 24H139V0H138V24ZM144 24H145V0H144V24ZM153 24H154V0H153V24ZM162 24H163V0H162V24ZM165 24H166V0H165V24ZM180 24H181V0H180V24ZM189 24H190V0H189V24ZM192 24H193V0H192V24ZM198 24H199V0H198V24ZM201 24H202V0H201V24ZM204 24H205V0H204V24ZM219 24H220V0H219V24ZM243 24H244V0H243V24ZM30 24H31V0H30V24ZM45 24H46V0H45V24ZM9 24H10V0H9V24ZM15 24H16V0H15V24ZM18 24H19V0H18V24Z";

    d3.select("svg")
        .append("path")
        .attr("d",pattern)
        .attr("fill", blue60)
        .attr("transform", "translate(16,0) scale(0.667)")
        ;

    // Add Logo
    const logo     = "M60.0336 10.9786L59.759 8.80236H57.1602V20H60.1604V14.211C60.4971 12.706 61.0337 11.4011 62.5689 11.4011C62.8362 11.4011 63.1673 11.4502 63.5618 11.5485L64.0688 8.65401C63.66 8.54198 63.2872 8.48498 62.9492 8.48498C61.4967 8.48498 60.5009 9.5992 60.0336 10.9786ZM65.5479 20H68.548V8.80236H65.5479V20ZM67.0266 3.68268C65.9235 3.68268 65.2095 4.44463 65.2095 5.43646C65.2095 6.43618 65.9331 7.19024 67.0266 7.19024C68.1242 7.19024 68.8649 6.4315 68.8649 5.43646C68.8649 4.44192 68.1262 3.68268 67.0266 3.68268ZM49.871 8.46438C48.5048 8.46438 47.1244 8.73848 45.7302 9.28769L46.4062 11.295C47.5891 10.901 48.5751 10.7035 49.364 10.7035C50.8855 10.7035 51.3713 11.2493 51.3713 12.5417V13.091H50.0822C47.2783 13.091 44.927 14.0665 44.927 16.8727C44.927 18.8636 46.258 20.338 48.5613 20.338C49.8495 20.338 50.835 19.8968 51.5568 19.0719L51.7093 20H54.308C54.308 19.862 54.308 11.8715 54.308 12.3728C54.308 9.55819 52.6528 8.46438 49.871 8.46438ZM51.3713 16.9366C50.8923 17.7678 50.2301 18.1824 49.3851 18.1824C48.4147 18.1824 47.9482 17.563 47.9482 16.6192C47.9482 15.4078 48.7583 14.8025 50.378 14.8025H51.3713V16.9366ZM78.7312 3.68268C77.6283 3.68268 76.9141 4.44451 76.9141 5.43646C76.9141 6.43618 77.6377 7.19024 78.7312 7.19024C79.8291 7.19024 80.5695 6.43131 80.5695 5.43646C80.5695 4.44419 79.8329 3.68268 78.7312 3.68268ZM100.873 8.46438C99.4262 8.46438 98.3543 9.09567 97.4505 10.2172L97.2181 8.80236H94.6194V20H97.6195V12.2667C98.137 11.4342 98.7907 10.7035 99.7746 10.7035C100.755 10.7035 101 11.3715 101 12.3512V20H104V11.8442C104 9.77991 102.898 8.46438 100.873 8.46438ZM87.3302 8.46438C85.964 8.46438 84.5835 8.73848 83.1894 9.28769L83.8653 11.295C85.0483 10.901 86.0342 10.7035 86.8232 10.7035C88.3446 10.7035 88.8304 11.2493 88.8304 12.5417V13.091H87.5414C84.7374 13.091 82.3861 14.0665 82.3861 16.8727C82.3861 18.8637 83.7173 20.338 86.0204 20.338C87.3087 20.338 88.2941 19.8968 89.016 19.0719L89.1684 20H91.7672C91.7672 19.862 91.7672 11.8715 91.7672 12.3728C91.7672 9.55832 90.112 8.46438 87.3302 8.46438ZM88.8304 16.9366C88.3515 17.7678 87.6892 18.1824 86.8443 18.1824C85.8739 18.1824 85.4074 17.563 85.4074 16.6192C85.4074 15.4078 86.2175 14.8025 87.8371 14.8025H88.8304V16.9366ZM77.2526 20H80.2526V8.80236H77.2526V20ZM71.4003 19.9997H74.4003V3.99967H71.4003V19.9997ZM44.4201 8.80236H41.3144L37.7228 13.8731L41.3355 20H44.7369L40.8496 13.7247L44.4201 8.80236ZM34.6172 20H37.6172V3.99998H34.6172V20Z";

    d3.select("svg")
        .append("path")
        .attr("d",logo)
        .attr("fill", white)
        .attr("transform", "translate(314,366) scale(0.667)")
        ;

    // Add Logo Type
    const logoType = "M4 24H5V17.0303L4 16.6633V24ZM6 24H21V22.9014L6 17.3972V24ZM22 24H23V23.6353L22 23.2684V24ZM0 24H3V16.2964L0 15.1956V24ZM18 0V2.1994L23.9938 0H18ZM17 0H16V2.93329L17 2.56635V0ZM15 0H6V6.60272L15 3.30023V0ZM4 7.33661L5 6.96967V0H4V7.33661ZM0 8.80438L3 7.70355V0H0V8.80438ZM20 19.3389V4.66107L19 5.02802V18.9719L20 19.3389ZM3 13.1008V10.8992L0 12L3 13.1008ZM17 5.7619L16 6.12885V17.8711L17 18.238V5.7619ZM21 4.29413V19.7058L24 20.8066V3.1933L21 4.29413ZM12 7.59668L6 9.79834V14.2017L12 16.4033V7.59668ZM14 17.1372V6.86273L13 7.22968V16.7703L14 17.1372ZM4 13.4678L5 13.8347V10.1653L4 10.5322V13.4678Z";

    d3.select("svg")
        .append("path")
        .attr("d",logoType)
        .attr("fill", blue60)
        .attr("transform", "translate(314,367) scale(0.667)")
        ;
    
    //Add H1
    d3.select("svg")
    .append("text")
    .style("font-size","16px")
    .style("font-weight","600")
    .style("font-family","fira")
    .style("fill",white)
    .text("CDx device approvals: PCR and NGS fight it out")
    .attr("transform", "translate(16, 39)")
    .attr("class","h1")
    ;

    //Add H2
    d3.select("svg")
      .append("text")
      .style("font-size","14px")
      .style("font-weight","400")
      .style("font-family","fira")
      .style("fill",white)
      .text("IHC a distant third")
      .attr("transform", "translate(16,62)")
      .attr("class","h2")
    ;

    //Add H3
    d3.select("svg")
        .append("text")
        .style("font-size","14px")
        .style("font-weight","600")
        .style("font-family","fira")
        .style("fill",white)
        .text("Analyte detection technology of FDA approved devices")
        .attr("transform", "translate(16,100)")
        .attr("class","h3")
    ;

    //Add H4
    d3.select("svg")
        .append("text")
        .style("font-size","12px")
        .style("font-weight","300")
        .style("font-family","fira")
        .style("fill",white)
        .text("cumulative plot of approved biomarkers over time")
        .attr("transform", "translate(16,117)") 
        .attr("class","h4")
    ;


    //Add Source Info
    d3.select("svg")
        .append("text")
        .style("font-size","12px")
        .style("font-weight","300")
        .style("font-family","fira")
        .style("fill",grey40)
        .text("Source: FIND+CONNECT: www.karilian.com")
        .attr("transform", "translate(16,378)") 
        .attr("class","h4")
    ;
    //Add Plot Area
    d3.select("svg")
      .append("rect")
      .attr("x","16")
      .attr("y","16")
      .attr("width","368")
      .attr("height","368")
      .style("fill",grey70)
    ;
*/

    // create 2 scale objects x and y
    //    define the type of scale
    //    define their "range" = OUTPUT value
    //    define their "domains" = INPUT value RANGE

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([16, 360]
      );


    const y = d3.scaleLinear()
      .domain([0, 140])
      .range([367, 30])
      .nice()
      ;


    // Add the X

    d3.select("svg")
      .append("g")
      .attr("transform", `translate(16,367)`)
      .style("font-size","16px")
      .style("font-weight","300")
      .style("font-family","fira")
      .attr("stroke", grey30)
      .call(d3.axisBottom(x)
        .ticks(d3.timeYear.every(1)) 
        .tickFormat(d3.timeFormat("%y"))
        )
      .call(g => g.select(".domain").remove())
      .selectAll(".tick line")
      .attr("stroke", grey90)
      .style("stroke-opacity",10)
      ;

    // Add the Y

    d3.select("svg")
      .append("g")
      .attr("transform", `translate(390,-8)`)
      .style("font-size","16px")
      .style("font-weight","300")
      .style("font-family","fira")
      .attr("stroke", grey30)
      .call(d3.axisLeft(y)
          .ticks(7)
        )
      .call(g => g.select(".domain").remove())
      .selectAll(".tick line")
      .style("stroke-opacity",0)
      ;

      // Add Y Grid lines

    var yGrid = 
      svgContainer.selectAll("yGrid")
      .data(y.ticks(7))
      .enter()
      .append("line")
    ;

    yGrid.attr("x1",16)
      .attr("y1",i => y(i))
      .attr("x2", 384)
      .attr("y2",i => y(i))
      .attr("stroke", grey90)
      .attr("stroke-width", 1)
    ;


// Plot the Line

    const lineIHC = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.IHC))
      .curve(d3.curveBasis)
      ;
    
      const linePCR = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.PCR))
      .curve(d3.curveBasis)
      ;

      const lineNGS = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.NGS))
      .curve(d3.curveBasis)
      ;

// add the line path to SVG

    d3.select("svg")
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", grey60)
      .attr("stroke-width", 5)
      .attr("d", lineIHC)
      ;

    d3.select("svg")
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", blue60)
      .attr("stroke-width", 5)
      .attr("d", linePCR)
      ;

    d3.select("svg")
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", red60)
      .attr("stroke-width", 6)
      .attr("d", lineNGS)
      ;


    //Add PCR
    d3.select("svg")
        .append("text")
        .style("font-size","16px")
        .style("font-weight","600")
        .style("font-family","fira")
        .style("fill",blue60)
        .text("PCR")
        .attr("transform", "translate(200,160)") 
        .attr("class","h4")
    ;
    //Add NGS
    d3.select("svg")
        .append("text")
        .style("font-size","16px")
        .style("font-weight","600")
        .style("font-family","fira")
        .style("fill",red60)
        .text("NGS")
        .attr("transform", "translate(330,50)") 
        .attr("class","h4")
    ;
    //Add IHC
    d3.select("svg")
        .append("text")
        .style("font-size","16px")
        .style("font-weight","600")
        .style("font-family","fira")
        .style("fill",grey60)
        .text("IHC")
        .attr("transform", "translate(330,295)") 
        .attr("class","h4")
    ;

    //export to SVG
    /*
    var nameToExport = "001" ;
    var SvgToExport = d3.select("svg").node();
    var xmlToExport = (new XMLSerializer()).serializeToString(SvgToExport);
    var blobToExport = new Blob([xmlToExport], {type: 'image/svg+xml;charset=utf-8'});
    var urlToExport = URL.createObjectURL(blobToExport);

    var a = document.createElement('a');
    a.href = urlToExport ;
    a.download = nameToExport + ".svg";

    document.body.appendChild(a);
    a.click();
    */
  })
  .catch(error => {
    console.error('Error reading CSV file:', error);
});
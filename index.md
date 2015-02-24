---
layout: default
---

# About This Document

These guidelines are a fork of the [Sass Guidelines by Hugo Giraudel](http://sass-guidelin.es), a front-end developer from France. They have been modified to match the standards we use on projects at [RP3 Agency](http://rp3agency.com).

# Table of Contents

* [About This Document](#about-this-document)
* [About Sass](#about-sass)
	* [Ruby Sass Or LibSass](#ruby-sass-or-libsass)
	* [Sass Or SCSS](#sass-or-scss)
* [Introduction](#introduction)
	* [Why A Styleguide](#why-a-styleguide)
	* [Disclaimer](#disclaimer)
	* [Key Principles](#key-principles)
* [Syntax & Formatting](#syntax--formatting)
	* [Strings](#strings)
	* [Numbers](#numbers)
	* [Zeros](#zeros)
	* [Units](#units)
	* [Calculations](#calculations)
	* [Magic numbers](#magic-numbers)
	* [Colors](#colors)
	* [Color formats](#color-formats)
	* [Colors and variables](#colors-and-variables)
	* [Lightening and Darkening Colors](#lightening-and-darkening-colors)
	* [Lists](#lists)
	* [Maps](#maps)
	* [Debugging A Sass Map](#debugging-a-sass-map)
	* [CSS Ruleset](#css-ruleset)
	* [Declaration Sorting](#declaration-sorting)
	* [Selector Nesting](#selector-nesting)
* [Naming Conventions](#naming-conventions)
	* [Constants](#constants)
	* [Namespace](#namespace)
* [Commenting](#commenting)
	* [Writing Comments](#writing-comments)
	* [Documentation](#documentation)
* [Architecture](#architecture)
	* [Components](#components)
	* [The 7-1 pattern](#the-7-1-pattern)
	* [Base Folder](#base-folder)
	* [Components Folder](#components-folder)
	* [Layout Folder](#layout-folder)
	* [Pages Folder](#pages-folder)
	* [Themes Folder](#themes-folder)
	* [Utils Folder](#utils-folder)
	* [Vendors Folder](#vendors-folder)
	* [Main file](#main-file)
	* [Shame file](#shame-file)
* [Responsive Web Design and Breakpoints](#responsive-web-design-and-breakpoints)
	* [Naming Breakpoints](#naming-breakpoints)
	* [Breakpoint manager](#breakpoint-manager)
	* [Media Queries Usage](#media-queries-usage)
* [Variables](#variables)
	* [Scoping](#scoping)
	* [!default Flag](#default-flag)
	* [!global Flag](#global-flag)
	* [Multiple Variables Or Map](#multiple-variables-or-maps)
* [Extend](#extend)
* [Mixins](#mixins)
	* [Basics](#basics)
	* [Arguments list](#arguments-list)
	* [Mixins and Vendor Prefixes](#mixins-and-vendor-prefixes)
* [Conditional statements](#conditional-statements)
* [Loops](#loops)
	* [Each](#each)
	* [For](#for)
	* [While](#while)
* [Warnings and errors](#warnings-and-errors)
	* [Warnings](#warnings)
	* [Errors](#errors)
* [Tools](#tools)
	* [Compass](#compass)
	* [Grid Systems](#grid-systems)
	* [SCSS-lint](#scss-lint)
* [Too Long; Didn't Read](#too-long-didnt-read)











# About Sass

This is how [Sass](http://sass-lang.com) describes itself in its [documentation](http://sass-lang.com/documentation/file.SASS_REFERENCE.html):

> Sass is an extension of CSS that adds power and elegance to the basic language.

Sass's ultimate objective is to fix CSS's flaws. CSS, as we all know, is not the best language in the world <sup>[citation needed]</sup>. While very simple to learn, it can quickly get quite messy, especially on large projects.

This is where Sass comes in, as a meta-language, to improve CSS's syntax in order to provide extra features and handy tools. Meanwhile, Sass wants to be conservative regarding the CSS language.

The point is not to turn CSS into a fully-featured programming language; Sass only wants to help where CSS fails. Because of this, getting started with Sass is no harder than learning CSS: it simply adds a couple of extra features on top of it.

That being said, there are many ways to use these features. Some good, some bad, some unusual. These guidelines are meant to give you a consistent and documented approach to writing Sass code.

### Further reading

* [Sass](http://sass-lang.com)
* [Sass documentation](http://sass-lang.com/documentation/file.SASS_REFERENCE.html)






## Ruby Sass or LibSass

[Sass' first commit](https://github.com/hcatlin/sass/commit/fa5048ba405619273e474a50400c7243fbff54fe) goes back as far as late 2006, over 8 years ago. Needless to say it has come a long way since then. Initially developed in Ruby, varied ports popped up here and there. The most successful one, [LibSass](https://github.com/sass/libsass) (written in C) is now close to being fully compatible with the original Ruby version.

In 2014, [Ruby Sass and LibSass teams decided to wait for both versions to sync up before moving forward](https://github.com/sass/libsass/wiki/The-LibSass-Compatibility-Plan). Since then, LibSass has been actively releasing versions to have feature-parity with its older brother. The last remaining inconsistencies are gathered and listed by myself under the [Sass-Compatibility](http://sass-compatibility.github.io) project. If you are aware of an incompatibility between the two versions that is not listed, please be kind enough to open an issue.

Until LibSass achieves full feature parity with Ruby Sass, RP3 will continue to use Ruby Sass in our projects. The Sass version RP3 will use will be the latest available at the commencement of a project, using [Bundler](http://bundler.io) to lock that version in place. Sass is compiled via [gulp](http://gulpjs.com) using the [gulp-ruby-sass plugin](https://www.npmjs.com/package/gulp-ruby-sass).



### Further reading

* [LibSass](https://github.com/sass/libsass)
* [Sass-Compatibility](http://sass-compatibility.github.io)
* [Switching from Ruby Sass to LibSass](http://www.sitepoint.com/switching-ruby-sass-libsass/)






## Sass or SCSS

There is quite a lot of confusion regarding the semantics of the name *Sass*, and for good reason: Sass means both the preprocessor and its own syntax. Not very convenient, is it?

You see, Sass initially described a syntax of which the defining characteristic was its indentation-sensitivity. Soon enough, Sass maintainers decided to close the gap between Sass and CSS by providing a CSS-friendly syntax called *SCSS* for *Sassy CSS*. The motto is: if it's valid CSS, it's valid SCSS.

Since then, Sass (the preprocessor) has been providing two different syntaxes: Sass (not all-caps, [please](http://sassnotsass.com)), also known as *the indented syntax*, and SCSS. Sass's whitespace-sensitive syntax relies on indentation to get rid of braces, semi-colons and other punctuation symbols, leading to a leaner and shorter syntax. Meanwhile, SCSS is easier to learn since it's mostly some tiny extra bits on top of CSS.

At RP3 Agency, we use SCSS because it is closer to CSS and friendlier to most developers. It also allows us to convert legacy CSS projects to Sass simply by changing the extension from `.css` to `.scss`.



### Further reading

* [What's the difference between Sass and SCSS](http://www.sitepoint.com/whats-difference-sass-scss/)






## Postprocessors

Sass is a preprocessor among other things. While this document mostly addresses Sass and how we use it at RP3 Agency, it's worth mentioning _postprocessors_ and their role. Postprocessors are pretty much equivalent to preprocessors except they do not provide anything else other than upcoming CSS syntax. The most well-known postprocessor is [Autoprefixer](https://github.com/postcss/autoprefixer), used to apply browser vendor prefixes to advanced CSS properties that need them. As with Sass itself, Autoprefixer is applied through gulp in our build process, allowing us to write completely standards-compliant CSS properties without regard to which advanced properties need the `-moz-*` or `-webkit-` prefixes.

# Introduction





## Why a styleguide

A styleguide is not just a pleasing document to read, picturing an ideal state for your code. It is a key document in a project's life, describing how and why code should be written. It may look like overkill for small projects, but it helps a lot in keeping the codebase clean, scalable and easily maintainable.

Needless to say, the more developers involved on a project, the more code guidelines are needed. Along the same lines, the bigger the project, the more a styleguide is a must.

[Harry Roberts](http://csswizardry.com) states it very well in [CSS Guidelines](http://cssguidelin.es/#the-importance-of-a-styleguide):

<blockquote>
	<p>A coding styleguide (note, not a visual styleguide) is a valuable tool for teams who:</p>
	<ul>
	<li>build and maintain products for a reasonable length of time;</li>
	<li>have developers of differing abilities and specialties;</li>
	<li>have a number of different developers working on a product at any given time;</li>
	<li>on-board new staff regularly;</li>
	<li>have a number of codebases that developers dip in and out of.</li>
	</ul>
</blockquote>






## Disclaimer

First things first: **this is not a CSS styleguide**. This document will not discuss naming conventions for CSS classes, modular patterns and the question of IDs in the CSS world. These guidelines only aim at dealing with Sass-specific content.

Also, this styleguide is specific to the projects at RP3 Agency and therefore **very opinionated**. Think of it as a collection of methodologies and advice that we have refined and polished over the years. It also grants the opportunity to link to a handful of insightful resources, so be sure to check the *further readings*.

Obviously, this is certainly not the only way of doing things. However, in order to work effectively _as a team_, these guidelines aim to establish certain base principles that we can all follow, allowing us to more easily work on each other's code.






## Key principles

At the end of the day, if there is one thing I would like you to get from this whole styleguide, it is that **Sass should be kept as simple as it can be**.

CSS is _not_ a programming language. Sass, being intended to write CSS, should not get much more complex than regular CSS. The [KISS principle](http://en.wikipedia.org/wiki/KISS_principle) (Keep It Simple Stupid) is key here and may even take precedence over the [DRY principle](http://en.wikipedia.org/wiki/Don%27t_repeat_yourself) (Don't Repeat Yourself) in some circumstances.

Sometimes, it's better to repeat a little to keep the code maintainable, rather than building a top-heavy, unwieldy, unnecessarily complicated system that is completely unmaintainable because it is overly complex.

Also, and to quote [Harry Roberts](https://csswizardry.com) once again, **pragmatism trumps perfection**. At some point, you will probably find yourself going against the rules described here. If it makes sense, if it feels right, do it. Code is just a means, not an end.

(However, if you do find a compelling reason to stray from the guidelines set forth in this document, please document said reason inline in the code. There may be a way to better adhere to these guidelines and still achieve your objectives if another developer on your team has the opportunity to review the code.)



### Further reading

* [KISS principle](http://en.wikipedia.org/wiki/KISS_principle)
* [DRY principle](http://en.wikipedia.org/wiki/Don%27t_repeat_yourself)
* [Keep Sass Simple](http://www.sitepoint.com/keep-sass-simple/)











# Syntax & formatting

When several developers are involved in writing CSS on the same project(s), it is only a matter of time before one of them starts doing things their own way. Code guidelines are not only meant to prevent this, but also help when reading and updating of code, by making it look consistent.

Roughly, we want:

* Tabbed indents, with tabs equal to four spaces;
* properly written multi-line CSS rules;
* meaningful use of whitespace.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
// Yep
.foo {
	display: block;
	overflow: hidden;
	padding: 0 1em;
}

// Nope
.foo {
	display: block; overflow: hidden;

	padding: 0 1em;
}
{% endhighlight %}
	</div>
</div>

We will not tackle the question of file organization in this section. It is the object of [another section](#architecture).






## Strings

CSS does not require strings to be quoted, not even those containing spaces. Take font-family names for instance: it doesn't matter whether you wrap them in quotes for the CSS parser.

Because of this, Sass *also* does not require strings to be quoted. Even better (and *luckily*, you'll concede), a quoted string is strictly equivalent to its unquoted twin (e.g. `"abc"` is strictly equal to `abc`).

That being said, languages that do not require strings to be quoted are definitely a minority and so, **strings should always be wrapped with double quotes**. Besides consistency with other languages, including CSS' cousin JavaScript, there are several reasons for this choice:

* color names are treated as colors when unquoted, which can lead to serious issues;
* most syntax highlighters will choke on unquoted strings;
* it helps general readability;
* text editors such as Sublime Text syntax highlight double quotes more consistently than they do single quotes when working with SCSS files;
* there is no valid reason not to quote strings.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
// Yep
$font-stack: "Helvetica Neue Light", "Helvetica", "Arial", sans-serif;

// Nope
$font-stack: 'Helvetica Neue Light', 'Helvetica', 'Arial', sans-serif;

// Nope
$font-stack: Helvetica Neue Light, Helvetica, Arial, sans-serif;
{% endhighlight %}
	</div>
</div>

<div class="note">
	<p>In the previous example, <code>sans-serif</code> is not being quoted because it is a specific CSS value that needs to be unquoted.</p>
</div>

URLs should be quoted as well, for the same reasons as above:

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
// Yep
.foo {
	background-image: url("/images/kittens.jpg");
}

// Nope
.foo {
	background-image: url(/images/kittens.jpg);
}
{% endhighlight %}
	</div>
</div>



### Further Reading

* [All You Ever Need to Know About Sass Interpolation](http://webdesign.tutsplus.com/tutorials/all-you-ever-need-to-know-about-sass-interpolation--cms-21375)
* [SassyStrings](https://github.com/HugoGiraudel/SassyStrings)






## Numbers

In Sass, number is a data type including everything from unitless numbers to lengths, durations, frequencies, angles and so on. This allows calculations to be run on such measures.



### Zeros

Numbers should display leading zeros before a decimal value less than one. Never display trailing zeros.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
// Yep
.foo {
	padding: 2em;
	opacity: 0.5;
}

// Nope
.foo {
	padding: 2.0em;
	opacity: .5;
}
{% endhighlight %}
	</div>
</div>



### Units

When dealing with lengths, a `0` value should never ever have a unit.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
// Yep
$length: 0;

// Nope
$length: 0em;
{% endhighlight %}
	</div>
</div>

The most common mistake I can think of regarding numbers in Sass, is thinking that units are just some strings that can be safely appended to a number. While that sounds true, that is certainly not how units work. Think of units as algebraic symbols. For instance, in the real world, multiplying 5 inches by 5 inches gives you 25 square inches. The same logic applies to Sass.

To add a unit to a number, you have to multiply this number by *1 unit*.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
$value: 42;

// Yep
$length: $value * 1px;

// Nope
$length: $value + px;
{% endhighlight %}
	</div>
</div>

Note that adding *0 member of that unit* also works, but I would rather recommend the aforementioned method since adding *0 unit* can somehow be a bit confusing. Indeed, when trying to convert a number to another compatible unit, adding 0 will not do the trick.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
$value: 42 + 0px;
// -> 42px

$value: 1in + 0px;
// -> 1in

$value: 0px + 1in;
// -> 96px
{% endhighlight %}
	</div>
</div>

In the end, it really depends on what you are trying to achieve. Just keep in mind that adding the unit as a string is not a good way to proceed.

To remove the unit of a value, you have to divide it by *one unit of its kind*.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
$length: 42px;

// Yep
$value: $length / 1px;

// Nope
$value: str-slice($length + unquote(''), 1, 2);
{% endhighlight %}
	</div>
</div>

Appending a unit as a string to a number results in a string, preventing any additional operation on the value. Slicing the numeric part of a number with a unit also results in a string. This is not what you want.



### Calculations

**Top-level numeric calculations should always be wrapped in parentheses**. Not only does this requirement dramatically improve readability, it also prevents some edge cases by forcing Sass to evaluate the contents of the parentheses.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
// Yep
.foo {
	width: ( 100% / 3 );
}

// Nope
.foo {
	width: 100% / 3;
}
{% endhighlight %}
	</div>
</div>



### Magic numbers

"Magic number" is an [old school programming](http://en.wikipedia.org/wiki/Magic_number_(programming)#Unnamed_numerical_constants) term for *unnamed numerical constant*. Basically, it's just a random number that happens to *just work*™ yet is not tied to any logical explanation.

Needless to say **magic numbers are a plague and should be avoided at all costs**. When you cannot manage to find a reasonable explanation for why a number works, add an extensive comment explaining how you got there and why you think it works. Admitting you don't know why something works is still more helpful to the next developer than them having to figure out what's going on from scratch.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
/**
 * 1. Magic number. This value is the lowest I could find to align the top of
 * `.foo` with its parent. Ideally, we should fix it properly.
 */
.foo {
	top: 0.327em; /* 1 */
}
{% endhighlight %}
	</div>
</div>



### Further reading

* [Use Lengths, Not Strings](http://hugogiraudel.com/2013/09/03/use-lengths-not-strings/)
* [Correctly Adding Unit to Number](http://css-tricks.com/snippets/sass/correctly-adding-unit-number/)
* [Magic Numbers in CSS](http://css-tricks.com/magic-numbers-in-css/)
* [Sassy-Math](https://github.com/at-import/sassy-math)






## Colors

Colors occupy an important place in the CSS language. Naturally, Sass ends up being a valuable ally when it comes to manipulating colors, mostly by providing a handful of [powerful functions](http://sass-lang.com/documentation/Sass/Script/Functions.html).



### Color formats

In order to make colors as simple as they can be, respect the following order of preference for color formats:

1. Hexadecimal notation. Preferably lowercase and shortened when possible.
1. [RGB notation](http://en.wikipedia.org/wiki/RGB_color_model);
1. [HSL notation](http://en.wikipedia.org/wiki/HSL_and_HSV);
1. [CSS color keywords](http://www.w3.org/TR/css3-color/#svg-color);

Hexadecimal notation is the most traditional way of expressing colors in CSS. Since the days when [web-safe colors](http://en.wikipedia.org/wiki/Web_colors#Web-safe_colors) were a thing, the hexadecimal system was the industry-standard for expressing colors, and as such all major software programs used to generate components for the web understand and work with it. Additionally, Sass has a number of color functions that can easily convert hexadecimal notation when another means (such as RGBa) is required.

Beyond that, RGB is the next most commonly used means of expressing colors. HSL, while increasingly popular, offers complications because software programs such as Photoshop can express colors in the similar-but-not-quite-the-same-thing HSB notation. Lastly, no web developer I have ever met uses the CSS official "named" color keywords on a regular basis. The only one that I use ever is "white" (#fff), and even then it is preferable to define that as a variable instead of using the CSS color name.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
// Yep
.foo {
	color: #f00;
}

// Nope
.foo {
	color: red;
}
{% endhighlight %}
	</div>
</div>

When using HSL or RGB notation, always add a single space after commas (`,`) and a single space between parentheses (`(`, `)`) and content.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
// Yep
.foo {
	color: rgba( 0, 0, 0, 0.1 );
	background: hsl( 300, 100%, 100% );
}

// Nope
.foo {
	color: rgba(0,0,0,0.1);
	background: hsl(300, 100%, 100%);
}
{% endhighlight %}
	</div>
</div>



### Colors and variables

When using a color more than once, store it in a variable with a meaningful name representing the color.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
$sass-pink: #c69;
{% endhighlight %}
	</div>
</div>

At this point, you are free to use this variable wherever you want. However, if your usage is strongly tied to a theme, I would advise against using the variable as is. Instead, store it in another variable with a name explaining how it should be used.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
$main-theme-color: $sass-pink;
{% endhighlight %}
	</div>
</div>

Doing this would prevent a theme change leading to something like `$sass-pink: blue`.



### Lightening and darkening colors



Both [`lighten`](http://sass-lang.com/documentation/Sass/Script/Functions.html#lighten-instance_method) and [`darken`](http://sass-lang.com/documentation/Sass/Script/Functions.html#darken-instance_method) functions manipulate the lightness of a color in the HSL space by adding or substracting lightness to it. Basically, they are nothing but aliases for the `$lightness` parameter of the [`adjust-color`](http://sass-lang.com/documentation/Sass/Script/Functions.html#adjust_color-instance_method) function.

The thing is, those functions often do not provide the expected result. On the other hand, the [`mix`](http://sass-lang.com/documentation/Sass/Script/Functions.html#mix-instance_method) function is a nice way to lighten or darken a color by mixing it with either `white` or `black`.

The benefit of using `mix` rather than one of the two aforementioned functions is that it will progressively go to black (or white) as you decrease the proportion of the color, whereas `darken` and `lighten` will quickly blow out a color all the way to black or white.

<figure>
	<img src="/sass-guidelines/assets/images/lighten-darken-mix.png" alt="Illustration of the difference between lighten/darken and mix Sass functions" />
	<figcaption>Illustration of the difference between <code>lighten</code>/<code>darken</code> and <code>mix</code> by <a href="http://codepen.io/KatieK2/pen/tejhz/" target="_blank">KatieK</a></figcaption>
</figure>

If you don't want to write the `mix` function every time, you can create two easy-to-use functions `tint` and `shade` (which are also a part of [Compass](http://compass-style.org/reference/compass/helpers/colors/#shade)) to do the same thing:

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
/// Slightly lighten a color
/// @access public
/// @param {Color} $color - color to tint
/// @param {Number} $percentage - percentage of `$color` in returned color
/// @return {Color}
@function tint($color, $percentage) {
	@return mix($color, white, $percentage);
}

/// Slightly darken a color
/// @access public
/// @param {Color} $color - color to shade
/// @param {Number} $percentage - percentage of `$color` in returned color
/// @return {Color}
@function shade($color, $percentage) {
	@return mix($color, black, $percentage);
}
{% endhighlight %}
	</div>
</div>

<div class="note">
	<p>The <a href="http://sass-lang.com/documentation/Sass/Script/Functions.html#scale_color-instance_method"><code>scale-color</code></a> function is designed to scale properties more fluidly by taking into account how high or low they already are. It should provide results that are as nice as <code>mix</code>'s but with a clearer calling convention. The scaling factor isn't exactly the same though.</p>
</div>



### Further reading

* [The Perfect Sunset, Part I: Better Colors With Sass](http://revoltpuppy.com/articles/39)
* [A Visual Guide to Sass & Compass Color Functions](http://jackiebalzer.com/color)
* [How to Programmatically Go From One Color to Another](http://thesassway.com/advanced/how-to-programtically-go-from-one-color-to-another-in-sass)
* [Sass Color Variables That Don't Suck](http://davidwalsh.name/sass-color-variables-dont-suck)
* [Using Sass to Build Color Palettes](http://www.sitepoint.com/using-sass-build-color-palettes/)
* [Dealing with Color Schemes in Sass](http://www.sitepoint.com/dealing-color-schemes-sass/)






## Lists

Lists are the Sass equivalent of arrays. A list is a flat data structure (unlike [maps](#maps)) intended to store values of any type (including lists, leading to nested lists).

Lists should respect the following guidelines:

* each list item should be on its own line;
* unless it is used as is for CSS purposes, always use comma as a delimiter;
* always enclose the list in parentheses;
* never add a trailing comma.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
// Yep
$font-stack: (
	"Helvetica",
	"Arial",
	sans-serif
);

// Nope
$font-stack: "Helvetica", "Arial", sans-serif;

// Nope
$font-stack:
	"Helvetica",
	"Arial",
	sans-serif;

// Nope
$font-stack: 'Helvetica' 'Arial' sans-serif;

// Nope
$font-stack: ('Helvetica', 'Arial', sans-serif);

// Nope
$font-stack: ('Helvetica', 'Arial', sans-serif,);
{% endhighlight %}
	</div>
</div>

When adding new items to a list, always use the provided API. Do not attempt to add new items manually.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
$shadows: 0 42px 13.37px hotpink;

// Yep
$shadows: append($shadows, $shadow, comma);

// Nope
$shadows: $shadows, $shadow;
{% endhighlight %}
	</div>
</div>



### Further reading

* [SassyLists](http://sassylists.com)






## Maps

Since Sass 3.3, stylesheets authors can define maps which is the Sass term for associative arrays or hashes. A map is a data structure mapping keys (that can be any data type, including maps although I wouldn't recommend it) to values of any type.

Maps should be written as follows:

* space after the colon (`:`);
* opening brace (`(`) on the same line as the colon (`:`);
* **quoted keys** if they are strings (which represents 99% of the cases);
* each key/value pair on its own new line;
* comma (`,`) at the end of each key/value;
* **trailing comma** (`,`) on last item to make it easier to add, remove or reorder items;
* closing brace (`)`) on its own new line;
* no space or new line between closing brace (`)`) and semi-colon (`;`).

Illustration:

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
// Yep
$breakpoints: (
	"small": 767px,
	"medium": 992px,
	"large": 1200px,
);

// Nope
$breakpoints: ( small: 767px, medium: 992px, large: 1200px );
{% endhighlight %}
	</div>
</div>



### Debugging a Sass map

If you ever find yourself lost, wondering what kind of crazy magic is happening in a Sass map, worry not because there is still a way to be saved.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
@mixin debug-map($map) {
	@at-root {
	@debug-map {
		__toString__: inspect($map);
		__length__: length($map);
		__depth__: if(function-exists('map-depth'), map-depth($map), null);
		__keys__: map-keys($map);
		__properties__ {
		@each $key, $value in $map {
			#{'(' + type-of($value) + ') ' + $key}: inspect($value);
		}
		}
	}
	}
}
{% endhighlight %}
	</div>
</div>

If you are interested in knowing the depth of the map, add the following function as well. The mixin will display it automatically.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
/// Compute the maximum depth of a map
/// @param {Map} $map
/// @return {Number} max depth of `$map`
@function map-depth($map) {
	$level: 1;

	@each $key, $value in $map {
	@if type-of($value) == 'map' {
		$level: max(map-depth($value) + 1, $level);
	}
	}

	@return $level;
}
{% endhighlight %}
	</div>
</div>



### Further reading

* [Using Sass Maps](http://www.sitepoint.com/using-sass-maps/)
* [Debugging Sass Maps](http://www.sitepoint.com/debugging-sass-maps/)
* [Real Sass, Real Maps](http://blog.grayghostvisuals.com/sass/real-sass-real-maps/)
* [Sass Maps are Awesome](http://viget.com/extend/sass-maps-are-awesome)
* [Sass list-maps](https://github.com/lunelson/sass-list-maps)
* [Sass Maps Plus](https://github.com/lunelson/sass-maps-plus)
* [Sassy-Maps](https://github.com/at-import/sassy-maps)
* [Introduction to Sass Maps Usage and Examples](http://webdesign.tutsplus.com/tutorials/an-introduction-to-sass-maps-usage-and-examples--cms-22184)






## CSS Ruleset

Here is how a CSS ruleset should be written at RP3:

* selectors on new lines;
* the opening brace (`{`) spaced from the last selector by a single space;
* each declaration on its own new line;
* a space after the colon (`:`);
* a trailing semi-colon (`;`) at the end of all declarations;
* the closing brace (`}`) on its own new line;
* a new line after the closing brace `}`.

Illustration:

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
// Yep
.baz,
.foo,
.foo-bar {
	display: block;
	margin: 0 auto;
	overflow: hidden;
}

// Nope
.foo,
.foo-bar, .baz {
	display: block;
	margin: 0 auto }
	overflow: hidden;
{% endhighlight %}
	</div>
</div>

Adding to those CSS-related guidelines, we want to pay attention to:

* local variables being declared before any declarations, then spaced from declarations by a new line;
* extend calls coming before any declaration;
* mixin calls coming after all declarations;
* mixin calls with `@content` coming after all declarations, then spaced from declarations by a new line;
* nested selectors always coming after a new line;
* no new line before a closing brace (`}`).

Illustration:

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
.baz,
.foo,
.foo-bar {
	$length: 42em;

	@extend %clearfix;
	display: block;
	margin: 0 auto;
	overflow: hidden;
	@include ellipsis;
	@include size($length);

	@include respond-to('small') {
		overflow: visible;
	}

	&:hover {
		color: red;
	}
}
{% endhighlight %}
	</div>
</div>



### Further reading

* [Anatomy of a Ruleset](http://cssguidelin.es/#anatomy-of-a-ruleset)






## Declaration Sorting

I cannot think of many topics where opinions are as divided as they are regarding declaration sorting in CSS. Concretely, there are two factions here:

* sticking to the alphabetical order;
* ordering declarations by type (position, display, colors, font, miscellaneous...).

There are pros and cons for both ways. On one hand, alphabetical order is universal (at least for languages using the latin alphabet) so there is no argument about sorting one property before another. However, it makes some logical sense to group like-properties together.

The problem with the like-properties together method is how to determine which properties are related. Are `color` and `background-color` related? Where do border properties fit in? What determines which group of properties goes to the top?

At RP3, we will sort CSS properties strictly alphabetically. This includes extend and mixin calls when there are multiple calls (keeping in mind, as stated above, extend calls come before regular property declarations, and mixin calls come after).

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
.foo {
	background-color: $black;
	bottom: 0;
	color: $white;
	font-weight: bold;
	font-size: 1.5em;
	height: 100px;
	overflow: hidden;
	position: absolute;
	right: 0;
	width: 100px;
}
{% endhighlight %}
	</div>
</div>

### Further reading

* [CSS Comb](https://github.com/csscomb/csscomb.js)
* [On Declaration Sorting](http://meiert.com/en/blog/20140924/on-declaration-sorting/)
* [Reduce File Size With CSS Sorting](http://peteschuster.com/2014/12/reduce-file-size-css-sorting/)
* [Poll Results: How Do You Order Your CSS Properties?](http://css-tricks.com/poll-results-how-do-you-order-your-css-properties/)






## Selector Nesting

One particular feature Sass provides that is being overly misused by many developers is *selector nesting*. Selector nesting offers a way for stylesheet authors to compute long selectors by nesting shorter selectors within each other. For instance, the following Sass nesting:

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
.foo {
	.bar {
		&:hover {
			color: red;
		}
	}
}
{% endhighlight %}
	</div>
</div>

... will generate this CSS:

{% highlight css %}
.foo .bar:hover {
	color: red;
}
{% endhighlight %}

Along the same lines, since Sass 3.3 it is possible to use the current selector reference (`&`) to generate advanced selectors. For instance:

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
.foo {
	&-bar {
		color: red;
	}
}
{% endhighlight %}
	</div>
</div>

... will generate this CSS:

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
.foo-bar {
	color: red;
}
{% endhighlight %}
	</div>
</div>

This method is often used along with [BEM naming conventions](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) to generate `.block__element` and `.block--modifier` selectors based on the original selector (i.e. `.block` in this case).

The problem with selector nesting is it ultimately makes code more difficult to read. One has to mentally compute the resulting selector out of the indentation levels; it is not always quite obvious what the CSS will end up being.

This statement becomes truer as selectors get longer and references to the current selector (`&`) more frequent. At some point, the risk of losing track and not being able to understand what's going on anymore is so high that it is not worth it.



### Further reading

* [Beware of Selector Nesting](http://www.sitepoint.com/beware-selector-nesting-sass/)
* [The Inception Rule](http://thesassway.com/beginner/the-inception-rule)
* [Avoid nested selectors for more modular CSS](http://thesassway.com/intermediate/avoid-nested-selectors-for-more-modular-css)











# Naming conventions

In this section, we will not deal with the best CSS naming conventions for maintainability and scale; not only is that up to you, it's also out of the scope of a Sass styleguide. I suggest those recommended by [CSS Guidelines](http://cssguidelin.es/#naming-conventions).

There are a few things you can name in Sass, and it is important to name them well so the whole code base looks both consistent and easy to read:

* variables;
* functions;
* mixins.

Sass placeholders are deliberately omitted from this list since they can be considered as regular CSS selectors, thus following the same naming pattern as classes.

Regarding variables, functions and mixins, we stick to something very *CSS-y*: **lowercase hyphen-delimited**, and above all meaningful.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
$vertical-rhythm-baseline: 1.5rem;

@mixin size($width, $height: $width) {
	// ...
}

@function opposite-direction($direction) {
	// ...
}
{% endhighlight %}
	</div>
</div>



### Further reading

* [CSS Guidelines' Naming Conventions](http://cssguidelin.es/#naming-conventions)






## Constants

If you happen to be a framework developer or library writer, you might find yourself dealing with variables that are not meant to be updated in any circumstances: constants. Unfortunately (or fortunately?), Sass does not provide any way to define such entities, so we have to stick to strict naming conventions to make our point.

As for many languages, I suggest all-caps snakerized variables when they are constants. Not only is this a very old convention, but it also constrats well with usual lowercased hyphenated variables.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
// Yep
$CSS_POSITIONS: top, right, bottom, left, center;

// Nope
$css-positions: top, right, bottom, left, center;
{% endhighlight %}
	</div>
</div>



### Further Reading

* [Dealing With Constants in Sass](http://www.sitepoint.com/dealing-constants-sass/)






## Namespace

If you intend to distribute your Sass code, in the case of a library, a framework, a grid system or whatever, you might want to consider namespacing all your variables, functions, mixins and placeholders so it does not conflict with anyone else's code.

For instance, if you work on a *Sassy Unicorn* project that is meant to be used by developers all over the world (who wouldn't, right?), you could consider using `su-` as a namespace. It is specific enough to prevent any naming collisions and short enough not to be a pain to write.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
$su-configuration: ( ... );

@function su-rainbow($unicorn) {
	// ...
}
{% endhighlight %}
	</div>
</div>

<div class="note">
	<p>Note that automatic namespacing is definitely a design goal for the upcoming <code>@import</code> revamp from Sass 4.0. As that comes closer to fruition, it will become less and less useful to do manual namespacing; eventually, manually-namespaced libraries may actually be harder to use.</p>
</div>

### Further reading

* [Please Respect the Global CSS Namespace](http://blog.kaelig.fr/post/44554267597/please-respect-the-global-css-namespace)











# Commenting

CSS is a tricky language, full of hacks and oddities. Because of this, it should be heavily commented, especially if you or someone else intend to read and update the code 6 months or 1 year from now. Don't let you or anybody else be in the position of *I-didn't-write-this-oh-my-god-why*.

As simple as CSS can get, there is still a lot of room for comments. These could be explaining:

* the structure and/or role of a file;
* the goal of a ruleset;
* the idea behind a magic number;
* the reason for a CSS declaration;
* the order of CSS declarations;
* the thought process behind a way of doing things.

And I probably forgot a lot of other various reasons as well. Commenting takes very little time when done seamlessly along with the code so do it at the right time. Coming back at a piece of code to comment it is not only completely unrealistic but also extremely annoying.






## Writing comments

Ideally, *any* CSS ruleset should be preceded by a C-style comment explaining the point of the CSS block. This comment also hosts numbered explanations regarding specific parts of the ruleset. For instance:

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
/**
 * Helper class to truncate and add ellipsis to a string too long for it to fit
 * on a single line.
 * 1. Prevent content from wrapping, forcing it on a single line.
 * 2. Add ellipsis at the end of the line.
 */
.ellipsis {
	white-space: nowrap; /* 1 */
	text-overflow: ellipsis; /* 2 */
	overflow: hidden;
}
{% endhighlight %}
	</div>
</div>

Basically everything that is not obvious at first glance should be commented. There is no such thing as too much documentation. Remember that you cannot *comment too much*, so get on fire and write comments for everything that is worth it.

When commenting a Sass-specific section, use Sass inline comments instead of a C-style block. This makes the comment invisible in the output, even in expanded mode during development.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
// Add current module to the list of imported modules.
// `!global` flag is required so it actually updates the global variable.
$imported-modules: append($imported-modules, $module) !global;
{% endhighlight %}
	</div>
</div>



### Further reading

* [CSS Guidelines' Commenting section](http://cssguidelin.es/#commenting)






## Documentation

Every variable, function, mixin and placeholder that is intended to be reused all over the codebase should be documented as part of the global API using [SassDoc](http://sassdoc.com).

SassDoc provides two different syntaxes for comments: either C-style or inline. For instance, both of the following snippets are valid SassDoc comments:

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
/**
 * Vertical rhythm baseline used all over the code base.
 * @type Length
 */
$vertical-rhythm-baseline: 1.5rem;
{% endhighlight %}
	</div>
</div>

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
/// Vertical rhythm baseline used all over the code base.
/// @type Length
$vertical-rhythm-baseline: 1.5rem;
{% endhighlight %}
	</div>
</div>

<div class="note">
	<p>Three slashes (<code>/</code>) required.</p>
</div>

At RP3, we use the C-style documentation syntax.

SassDoc has two major roles:

* forcing standardized comments using an annotation-based system for everything that is part of a public or private API;
* being able to generate an HTML version of the API documentation by using any of the SassDoc endpoints (CLI tool, Grunt, Gulp, Broccoli, Node...).

<figure>
<img alt="" src="/sass-guidelines/assets/images/sassdoc-preview.png" />
<figcaption>Documentation generated by SassDoc</figcaption>
</figure>

Here is an example of a mixin extensively documented with SassDoc:

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
/// Mixin helping defining both `width` and `height` simultaneously.
///
/// @author Hugo Giraudel
///
/// @access public
///
/// @param {Length} $width - Element's `width`
/// @param {Length} $height ($width) - Element's `height`
///
/// @example scss - Usage
/// .foo {
///   @include size(10em);
/// }
///
/// .bar {
///   @include size(100%, 10em);
/// }
///
/// @example css - CSS output
/// .foo {
///   width: 10em;
///   height: 10em;
/// }
///
/// .bar {
///   width: 100%;
///   height: 10em;
/// }
@mixin size($width, $height: $width) {
	width: $width;
	height: $height;
}
{% endhighlight %}
	</div>
</div>


At RP3, we have not used SassDoc or generated API documentation to any extent, but as our library of completed projects grows allowing for reuse of Sass functions and mixins between projects, and as our team of our developers continues to grow, we will begin using SassDoc more extensively.


### Further reading

* [SassDoc](http://sassdoc.com)
* [SassDoc: a Documentation Tool for Sass](http://www.sitepoint.com/sassdoc-documentation-tool-sass/)
* [New Features and New Look for SassDoc](http://webdesign.tutsplus.com/articles/new-features-and-a-new-look-for-sassdoc--cms-21914)











# Architecture

Architecting a CSS project is probably one of the most difficult things you will have to do in a project's life. Keeping the architecture consistent and meaningful is even harder.

Fortunately, one of the main benefits of using a CSS preprocessor is having the ability to split the codebase over several files without impacting performance (like the `@import` CSS directive would do). Thanks to Sass' overload of the `@import` directive, it is perfectly safe (and actually recommended) to use as many files as necessary in development, all compiled into a single stylesheet when going to production.

On top of that, I cannot stress enough the need for folders, even on small scale projects. At home, you don’t drop every sheet of paper into the same box. You use folders; one for the house/flat, one for the bank, one for bills, and so on. There is no reason to do otherwise when structuring a CSS project. Split the codebase into meaningful separated folders so it is easy to find stuff later when you have to come back to the code.

There are a lot of popular architectures for CSS projects: [OOCSS](http://oocss.org/), [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/), [Bootstrap](http://getbootstrap.com/)-like, [Foundation](http://foundation.zurb.com/)-like... They all have their merits, pros and cons.

At RP3, we are using the [BEM](http://en.bem.info) (Block, Element, Modifier) methodology for structuring our CSS.



### Further reading

* [Architecture for a Sass project](http://www.sitepoint.com/architecture-sass-project/)
* [A Look at Different Sass Architectures](http://www.sitepoint.com/look-different-sass-architectures/)
* [FR] [Sass, une architecture composée](http://slides.com/hugogiraudel/sass-une-architecture-composee)
* [SMACSS](https://smacss.com/)
* [An Introduction to OOCSS](http://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/)
* [Atomic Web Design](http://bradfrost.com/blog/post/atomic-web-design/)






## Components

There is a major difference between making it *work*, and making it *good*. Again, CSS is quite a messy language <sup>[citation needed]</sup>. The less CSS we have, the merrier. We don't want to deal with megabytes of CSS code. To keep stylesheets short and efficient&mdash;and this will not be any surprise to you&mdash;it is usually a good idea to think of an interface as a collection of components.

Components can be anything, as long as they:

* do one thing and one thing only;
* are re-usable and re-used across the project;
* are independent.

For instance, a search form should be treated as a component. It should be reusable, at different positions, on different pages, in various situations. It should not depend on its position in the DOM (footer, sidebar, main content...).

Most of any interface can be thought of as little components and I highly recommend you stick to this paradigm. This will not only shorten the amount of CSS needed for the whole project, but also happens to be much easier to maintain than a chaotic mess where everything is flustered.






## Directory Structure

This area is under development.

<!--

Back to architecture, shall we? I usually go with what I call the *7-1 pattern*: 7 folders, 1 file. Basically, you have all your partials stuffed into 7 different folders, and a single file at the root level (usually named `project-name.scss`) which imports them all to be compiled into a CSS stylesheet.

* `base/`
* `components/`
* `layout/`
* `pages/`
* `themes/`
* `utils/`
* `vendors/`

And of course:

* `project-name.scss`

<figure>
	<img src="/sass-guidelines/assets/images/sass-wallpaper.jpg" alt="" />
	<figcaption>Wallpaper by <a href="https://twitter.com/julien_he">Julien He</a></figcaption>
</figure>

Ideally, we can come up with something like this:

<div class="highlight"><pre><code>
sass/
|
|– base/
|   |– _reset.scss       # Reset
|   |– _typography.scss  # Typography rules
|   ...                  # Etc…
|
|– components/
|   |– _buttons.scss     # Buttons
|   |– _carousel.scss    # Carousel
|   |– _cover.scss       # Cover
|   |– _dropdown.scss    # Dropdown
|   ...                  # Etc…
|
|– layout/
|   |– _navigation.scss  # Navigation
|   |– _grid.scss        # Grid system
|   |– _header.scss      # Header
|   |– _footer.scss      # Footer
|   |– _sidebar.scss     # Sidebar
|   |– _forms.scss       # Forms
|   ...                  # Etc…
|
|– pages/
|   |– _home.scss        # Home specific styles
|   |– _contact.scss     # Contact specific styles
|   ...                  # Etc…
|
|– themes/
|   |– _theme.scss       # Default theme
|   |– _admin.scss       # Admin theme
|   ...                  # Etc…
|
|– utils/
|   |– _variables.scss   # Sass Variables
|   |– _functions.scss   # Sass Functions
|   |– _mixins.scss      # Sass Mixins
|   |– _helpers.scss     # Class & placeholders helpers
|
|– vendors/
|   |– _bootstrap.scss   # Bootstrap
|   |– _jquery-ui.scss   # jQuery UI
|   ...                  # Etc…
|
|
`– project-name.scss             # primary Sass file
</code></pre></div>

<div class="note">
	<p>Files follow the same naming conventions described above: they are hyphen-delimited.</p>
</div>



### Base folder

The `base/` folder holds what we might call the boilerplate code for the project. In there, you might find the reset file, some typographic rules, and probably a stylesheet (that I'm used to calling `_base.scss`), defining some standard styles for commonly used HTML elements.

* `_base.scss`
* `_reset.scss`
* `_typography.scss`



### Layout folder

The `layout/` folder contains everything that takes part in laying out the site or application. This folder could have stylesheets for the main parts of the site (header, footer, navigation, sidebar...), the grid system or even CSS styles for all the forms.

* `_grid.scss`
* `_header.scss`
* `_footer.scss`
* `_sidebar.scss`
* `_forms.scss`
* `_navigation.scss`

<div class="note">
	<p>The <code>layout/</code> folder might also be called <code>partials/</code>, depending on what you prefer.</p>
</div>



### Components folder

For smaller components, there is the `components/` folder. While `layout/` is *macro* (defining the global wireframe), `components/` is more focused on widgets. It contains all kind of specific modules like a slider, a loader, a widget, and basically anything along those lines. There are usually a lot of files in `components/` since the whole site/application should be mostly composed of tiny modules.

* `_media.scss`
* `_carousel.scss`
* `_thumbnails.scss`

<div class="note">
	<p>The <code>components/</code> folder might also be called <code>modules/</code>, depending on what you prefer.</p>
</div>



### Pages folder

If you have page-specific styles, it is better to put them in a `pages/` folder, in a file named after the page. For instance, it’s not uncommon to have very specific styles for the home page hence the need for a `_home.scss` file in `pages/`.

* `_home.scss`
* `_contact.scss`

<div class="note">
	<p>Depending on your deployment process, these files could be called on their own to avoid merging them with the others in the resulting stylesheet. It is really up to you.</p>
</div>



### Themes folder

On large sites and applications, it is not unusual to have different themes. There are certainly different ways of dealing with themes but I personally like having them all in a `themes/` folder.

* `_theme.scss`
* `_admin.scss`

<div class="note">
	<p>This is very project-specific and is likely to be non-existent on many projects.</p>
</div>



### Utils folder

The `utils/` folder gathers all Sass tools and helpers used across the project. Every global variable, function, mixin and placeholder should be put in here.

The rule of thumb for this folder is that it should not output a single line of CSS when compiled on its own. These are nothing but Sass helpers.

* `_variables.scss`
* `_mixins.scss`
* `_functions.scss`
* `_placeholders.scss` (frequently named `_helpers.scss`)

<div class="note">
	<p>The <code>utils/</code> folder might also be called <code>helpers/</code>, <code>sass-helpers/</code> or <code>sass-utils/</code>, depending on what you prefer.</p>
</div>



### Vendors folder

And last but not least, most projects will have a `vendors/` folder containing all the CSS files from external libraries and frameworks – Normalize, Bootstrap, jQueryUI, FancyCarouselSliderjQueryPowered, and so on. Putting those aside in the same folder is a good way to say “Hey, this is not from me, not my code, not my responsibility”.

* `_normalize.scss`
* `_bootstrap.scss`
* `_jquery-ui.scss`
* `_select2.scss`

If you have to override a section of any vendor, I recommend you have an 8th folder called `vendors-extensions/` in which you may have files named exactly after the vendors they overwrite.

For instance, `vendors-extensions/_boostrap.scss` is a file containing all CSS rules intended to re-declare some of Bootstrap's default CSS. This is to avoid editing the vendor files themselves, which is generally not a good idea.



### Main file

The main file (usually labelled `main.scss`) should be the only Sass file from the whole code base not to begin with an underscore. This file should not contain anything but `@import` and comments.

Files should be imported according to the folder they live in, one after the other in the following order:

1. `vendors/`
1. `utils/`
1. `base/`
1. `layout/`
1. `components/`
1. `pages/`
1. `themes/`

In order to preserve readability, the main file should respect these guidelines:

* one file per `@import`;
* one `@import` per line;
* no new line between two imports from the same folder;
* a new line after the last import from a folder;
* file extensions and leading underscores omitted.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
@import 'vendors/bootstrap';
@import 'vendors/jquery-ui';

@import 'utils/variables';
@import 'utils/functions';
@import 'utils/mixins';
@import 'utils/placeholders';

@import 'base/reset';
@import 'base/typography';

@import 'layout/navigation';
@import 'layout/grid';
@import 'layout/header';
@import 'layout/footer';
@import 'layout/sidebar';
@import 'layout/forms';

@import 'components/buttons';
@import 'components/carousel';
@import 'components/cover';
@import 'components/dropdown';

@import 'pages/home';
@import 'pages/contact';

@import 'themes/theme';
@import 'themes/admin';
{% endhighlight %}
	</div>
</div>

There is another way of importing partials that I deem valid as well. On the bright side, it makes the file more readable. On the other hand, it makes updating it slightly more painful. Anyway, I'll let you decide which is best, it does not matter much. For this way of doing, the main file should respect these guidelines:

* one `@import` per folder;
* a linebreak after `@import`;
* each file on its own line;
* a new line after the last import from a folder;
* file extensions and leading underscores omitted.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
@import
	'vendors/bootstrap',
	'vendors/jquery-ui';

@import
	'utils/variables',
	'utils/functions',
	'utils/mixins',
	'utils/placeholders';

@import
	'base/reset',
	'base/typography';

@import
	'layout/navigation',
	'layout/grid',
	'layout/header',
	'layout/footer',
	'layout/sidebar',
	'layout/forms';

@import
	'components/buttons',
	'components/carousel',
	'components/cover',
	'components/dropdown';

@import
	'pages/home',
	'pages/contact';

@import
	'themes/theme',
	'themes/admin';
{% endhighlight %}
	</div>
</div>

<div class="note">
	<p>In order to not have to import each file manually, there is an extension to Ruby Sass called <a href="https://github.com/chriseppstein/sass-globbing">sass-globbing</a>, making it possible to use glob patterns in Sass <code>@import</code> such as <code>@import "components/*"</code>.</p>
	<p>That being said, I would not recommend it because it imports files following the alphabetical order which is usually not what you want, especially when dealing with a source-order dependent language.</p>
</div>

-->





# Responsive Web Design and breakpoints

I do not think we still have to introduce Responsive Web Design now that it is everywhere. However you might ask yourself *why is there a section about RWD in a Sass styleguide?* Actually there are quite a few things that can be done to make working with breakpoints easier, so I thought it would not be such a bad idea to list them here.






## Naming breakpoints

Media queries should not be tied to specific devices. For instance, this is definitely a bad idea to try targeting iPads or Blackberry phones specifically. Media queries should take care of a range of screen sizes, until the design breaks and the next media query takes over.

For the same reasons, breakpoints should not be named after devices but something more general. Especially since some phones are now bigger than tablets, some tablets bigger than some tiny screen computers, and so on...

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
// Yep
$breakpoints: (
	"medium": 680px,
	"large": 1000px,
	"xlarge": 1200px,
);

// Nope
$breakpoints: (
	"tablet": 680px,
	"computer": 1000px,
	"tv": 1200px,
);
{% endhighlight %}
	</div>
</div>

At this point, any naming convention that makes crystal clear that a design is not intimately tied to a specific device type will do the trick, as long as it gives a sense of magnitude.




### Further reading

* [Naming Media Queries](http://css-tricks.com/naming-media-queries/)






## Breakpoint manager

RP3 uses the [Breakpoint](http://breakpoint-sass.com) library to create media queries in our projects. Always use em-based media queries by setting the variable `$breakpoint-to-ems: true` in the `_settings.scss` partial in your project.



### Further Reading

* [Managing Responsive Breakpoints in Sass](http://www.sitepoint.com/managing-responsive-breakpoints-sass/)
* [Approaches to Media Queries in Sass](http://css-tricks.com/approaches-media-queries-sass/)






## Media Queries Usage

Not so long ago, there has been a quite hot debate about where should be written media queries: should they belong within selectors (as Sass allows it) or strictly dissociated from them? I have to say I am a fervent defender of the *media-queries-within-selectors* system, as I think it plays well with the ideas of *components*.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
.foo {
	color: red;

	@include respond-to('small') {
		color: blue;
	}
}
{% endhighlight %}
	</div>
</div>

Leading to the following CSS output:

{% highlight css %}
.foo {
	color: red;
}

@media (max-width: 800px) {
	.foo {
		color: blue;
	}
}
{% endhighlight %}

You might hear that this convention results in duplicated media queries in the CSS output. That is definitely true. Although, [tests have been made](http://sasscast.tumblr.com/post/38673939456/sass-and-media-queries) and the final word is that it doesn't matter once Gzip (or any equivalent) has done its thing:

> … we hashed out whether there were performance implications of combining vs scattering Media Queries and came to the conclusion that the difference, while ugly, is minimal at worst, essentially non-existent at best.<br>
> &mdash; [Sam Richards](https://twitter.com/snugug), regarding [Breakpoint](http://breakpoint-sass.com/)

Now, if you really are concerned about duplicated media queries, you can still use a tool to merge them such as [this gem](https://github.com/aaronjensen/sass-media_query_combiner) however I feel like I have to warn you against possible side-effects of moving CSS code around. You are not without knowing that source order is important.



### Further Reading

* [Sass and Media Queries](http://sasscast.tumblr.com/post/38673939456/sass-and-media-queries)
* [Inline or Combined Media queries? Fight!](http://benfrain.com/inline-or-combined-media-queries-in-sass-fight/)
* [Sass::MediaQueryCombiner](https://github.com/aaronjensen/sass-media_query_combiner)











# Variables

Variables are the essence of any programming language. They allow us to reuse values without having to copy them over and over again. Most importantly, they make updating a value very easy. No more find and replace or manual crawling.

However CSS is nothing but a huge basket containing all our eggs. Unlike many languages, there are no real scopes in CSS. Because of this, we have to pay real attention when adding variables at the risk of witnessing conflicts.

My advice would be to only create variables when it makes sense to do so. Do not initiate new variables for the heck of it, it won't help. A new variable should be created only when all of the following criteria are met:

* the value is repeated at least twice;
* the value is likely to be updated at least once;
* all occurrences of the value are tied to the variable (i.e. not by coincidence).

Basically, there is no point declaring a variable that will never be updated or that is only being used at a single place.






## Scoping

Variable scoping in Sass has changed over the years. Until fairly recently, variable declarations within rulesets and other scopes were local by default. However when there was already a global variable with the same name, the local assignment would change the global variable. Since version 3.4, Sass now properly tackles the concept of scopes and create a new local variable instead.

The docs talk about *global variable shadowing*. When declaring a variable that already exists on the global scope in an inner scope (selector, function, mixin...), the local variable is said to be *shadowing* the global one. Basically, it overrides it just for the local scope.

The following code snippet explains the *variable shadowing* concept.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
// Initialize a global variable at root level.
// In this case, the `!global` flag is optional.
$variable: 'initial value' !global;

// Create a mixin that overrides that global variable.
@mixin global-variable-overriding {
	$variable: 'mixin value' !global;
}

.local-scope {
	// Create a local variable that shadows the global one.
	$variable: 'local value';

	// Include the mixin: it overrides the global variable.
	@include global-variable-overriding;

	// Print the variable's value.
	// It is the **local** one, since it shadows the global one.
	content: $variable;
}

// Print the variable in another selector that does no shadowing.
// It is the **global** one, as expected.
.other-local-scope {
	content: $variable;
}
{% endhighlight %}
	</div>
</div>








## `!global` flag

The `!global` flag should only be used when overriding a global variable from a local scope. When defining a variable at root level, the `!global` flag should be omitted.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
// Yep
$baseline: 2em;

// Nope
$baseline: 2em !global;
{% endhighlight %}
	</div>
</div>






## Multiple variables or maps

There are advantages of using maps rather than multiple distinct variables. The main one is the ability to loop over a map, which is not possible with distinct variables.

Another pro of using a map is the ability to create a little getter function to provide a friendlier API. For instance, consider the following Sass code:

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
/// Z-indexes map, gathering all Z layers of the application
/// @access private
/// @type Map
/// @prop {String} key - Layer's name
/// @prop {Number} value - Z value mapped to the key
$z-indexes: (
	'modal': 5000,
	'dropdown': 4000,
	'default': 1,
	'below': -1,
);

/// Get a z-index value from a layer name
/// @access public
/// @param {String} $layer - Layer's name
/// @return {Number}
/// @require $z-indexes
@function z($layer) {
	@return map-get($z-indexes, $layer);
}
{% endhighlight %}
	</div>
</div>











# Extend

The `@extend` directive has to be one of the features that made Sass so popular a couple of years ago. As a reminder, it makes it possible to tell Sass to style an element A exactly as though it also matched selector B. Needless to say this can end up being a valuable ally when writing modular CSS.

At RP3, we use `@extend` vary sparingly, and exclusively with placeholder selectors (denoted by a `%` at the beginning of the selector name, as opposed to `.` for classes). Furthermore, `@extend` is primarily used for selectors that in pure CSS would be considered non-semantic. These include `clearfix` and `ir` (image replacement) type classes, to name two common uses. However, if you find yourself repeating a particular style pattern often, and that pattern will never require arguments to adjust the output, than it is a good candidate for `@extend`. (If it *does* require arguments, or needs to be placed inside a media query (see below), you will need to use a mixin instead.)

Also, `@extend` does not play well with `@media` blocks. As you may know, Sass is unable to extend an outer selector from within a media query. When doing so, the compiler simply crashes, telling you that you cannot do such a thing. Not great. Especially since media queries are almost all we do know.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
.foo {
	content: "foo";
}

@media print {
	.bar {
		// This doesn't work. Worse: it crashes.
		@extend .foo;
	}
}
{% endhighlight %}
	</div>
</div>

> You may not @extend an outer selector from within @media.<br>
> You may only @extend selectors within the same directive.


### Further reading

* [What Nobody Told you About Sass Extend](http://www.sitepoint.com/sass-extend-nobody-told-you/)
* [Don't Over Extend Yourself](http://pressupinc.com/blog/2014/11/dont-overextend-yourself-in-sass/)
* [When to Use Extend; When to Use a Mixin](http://csswizardry.com/2014/11/when-to-use-extend-when-to-use-a-mixin/)











# Mixins

Mixins are one of the most used features from the whole Sass language. They are the key to re-usability and DRY components. And for good reason: mixins allow authors to define styles that can be re-used throughout the stylesheet without needing to resort to non-semantic classes such as `.float-left`.

They can contain full CSS rules and pretty much everything that is allowed anywhere in a Sass document. They can even take arguments, just like functions. Needless to say, the possibilities are endless.

But I feel I must warn you against abusing the power of mixins. Again, the keyword here is *simplicity*. It might be tempting to build extremely powerful mixins with massive amounts of logic. It's called over-engineering and most developers suffer from it. Don't over think your code, and above all keep it simple. If a mixin ends up being longer than 20 lines or so, then it should be either split into smaller chunks or completely revised.






## Basics

That being said, mixins are extremely useful and you should be using some. The rule of thumb is that if you happen to spot a group of CSS properties that always appear together for a reason (i.e. not a coincidence), you can put them in a mixin instead.


### Further reading

* [Sass Mixins to Kickstart your Project](http://www.sitepoint.com/sass-mixins-kickstart-project/)
* [A Sass Mixin for CSS Triangles](http://www.sitepoint.com/sass-mixin-css-triangles/)
* [Building a Linear-Gradient Mixin](http://www.sitepoint.com/building-linear-gradient-mixin-sass/)






## Arguments list

When dealing with an unknown number of arguments in a mixin, always use an `arglist` rather than a list. Think of `arglist` as the 8th hidden undocumented data type from Sass that is implicitly used when passing an arbitrary number of arguments to a mixin or a function whose signature contains `...`.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
@mixin shadows($shadows...) {
	// type-of($shadows) == 'arglist'
	// ...
}
{% endhighlight %}
	</div>
</div>

Now, when building a mixin that accepts a handful of arguments (understand 3 or more), think twice before merging them out as a list or a map thinking it will be easier than passing them all one by one.

Sass is actually pretty clever with mixins and function declarations, so much so that you can actually pass a list or a map as an arglist to a function/mixin so that it gets parsed as a series of arguments.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
@mixin dummy($a, $b, $c) {
	// ...
}

// Yep
@include dummy(true, 42, 'kittens');

// Yep but nope
$params: true, 42, 'kittens';
$value: dummy(nth($params, 1), nth($params, 2), nth($params, 3));

// Yep
$params: true, 42, 'kittens';
@include dummy($params...);

// Yep
$params: (
	'c': 'kittens',
	'a': true,
	'b': 42
);
@include dummy($params...);
{% endhighlight %}
	</div>
</div>



### Further reading

* [Sass Multiple Arguments, Lists or Arglist](http://www.sitepoint.com/sass-multiple-arguments-lists-or-arglist/)






## Mixins and vendor prefixes

It might be tempting to define custom mixins to handle vendor prefixes for unsupported or partially supported CSS properties. But we do not want to do this. First, if you can use [Autoprefixer](https://github.com/postcss/autoprefixer), use Autoprefixer. It will remove Sass code from your project, will always be up-to-date and will necessarily do a much better job than you at prefixing stuff.

In our build process, we use `gulp-autoprefixer` to add vendor prefixes to our finished stylesheets.




### Further reading

* [Autoprefixer](https://github.com/postcss/autoprefixer)
* [Building a Linear-Gradient Mixin](http://www.sitepoint.com/building-linear-gradient-mixin-sass/)











# Conditional statements

You probably already know that Sass provides conditional statements via the `@if` and `@else` directives. Unless you have some medium to complex logic in your code, there is no need for conditional statements in your everyday stylesheets. Actually, the mainly exist for libraries and frameworks.

Anyway, if you ever find yourself in need of them, please respect the following guidelines:

* Use parentheses for readability;
* Always a line break after the opening brace (`{`);
* `@else` statements on the same line as previous closing brace (`}`).

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
// Yep
@if ( $support-legacy ) {
	// ...
} @else {
	// ...
}

// Nope
@if ( $support-legacy == true ) {
	// ...
}
@else {
	// ...
}
{% endhighlight %}
	</div>
</div>

When testing for a falsy value, always use the `not` keyword rather than testing against `false` or `null`.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
// Yep
@if ( not index( $list, $item ) ) {
	// ...
}

// Nope
@if ( index( $list, $item ) == null ) {
	// ...
}
{% endhighlight %}
	</div>
</div>

When using conditional statements within a function to return a different result based on some condition, always make sure the function still has a `@return` statement outside of any conditional block.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
// Yep
@function dummy( $condition ) {
	@if ( $condition ) {
		@return true;
	}

	@return false;
}

// Nope
@function dummy( $condition ) {
	@if ( $condition ) {
		@return true;
	} @else {
		@return false;
	}
}
{% endhighlight %}
	</div>
</div>











# Loops

Because Sass provides complex data structures such as [lists](#lists) and [maps](#maps), it is no surprise that it also gives a way for authors to iterate over those entities.






## Each

The `@each` loop is definitely the most-used out of the three loops provided by Sass. It provides a clean API to iterate over a list or a map.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
@each $theme in $themes {
	.section-#{$theme} {
		background-color: map-get( $colors, $theme );
	}
}
{% endhighlight %}
	</div>
</div>

When iterating on a map, always use `$key` and `$value` as variable names to enforce consistency.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
@each $key, $value in $map {
	.section-#{$key} {
		background-color: $value;
	}
}
{% endhighlight %}
	</div>
</div>






## For

The `@for` loop might be useful when combined with CSS' `:nth-*` pseudo-classes. Except for these scenarios, prefer an `@each` loop if you *have to* iterate over something.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
@for $i from 1 through 10 {
	.foo:nth-of-type( #{$i} ) {
		border-color: hsl( $i * 36, 50%, 50% );
	}
}
{% endhighlight %}
	</div>
</div>

Always use `$i` as a variable name to stick to the usual convention and unless you have a really good reason to, never use the `to` keyword: always use `through`. Many developers do not even know Sass offers this variation; using it might lead to confusion.






## While

The `@while` loop has absolutely no use case in a real Sass project. **Do not use it**.











# Warnings and Errors

If there is a feature that is often overlooked by Sass developers, it is the ability to dynamically output warnings and errors. Indeed, Sass comes with three custom directives to print content in the standard output system (CLI, compiling app...):

* `@debug`;
* `@warn`;
* `@error`.

Let's put `@debug` aside since it is clearly intended to debug SassScript, which is not our point here. We are then left with `@warn` and `@error` which are noticeably identical except that one stops the compiler while the other does not. I'll let you guess which does what.

Now, there is a lot of room in a Sass project for warnings and errors. Basically any mixin or function expecting a specific type or argument could throw an error if something went wrong, or display a warning when doing an assumption.



### Further reading

* [An Introduction To Error Handling](http://webdesign.tutsplus.com/tutorials/an-introduction-to-error-handling-in-sass--cms-19996)
* [Building a Logger Mixin](http://webdesign.tutsplus.com/tutorials/building-a-logger-mixin-in-sass--cms-22070)
* [SassyLogger](https://github.com/HugoGiraudel/SassyLogger)






## Warnings

Take this function from [Sass-MQ](https://github.com/sass-mq/sass-mq) attempting to convert a `px` value to `em`, for instance:

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
@function mq-px2em( $px, $base-font-size: $mq-base-font-size ) {
	@if unitless( $px ) {
		@warn 'Assuming #{$px} to be in pixels, attempting to convert it into pixels.';
		@return mq-px2em( $px * 1px);
	} @else if unit( $px ) == em {
		@return $px;
	}

	@return ($px / $base-font-size) * 1em;
}
{% endhighlight %}
	</div>
</div>

If the value happens to be unitless, the function assumes the value is meant to be expressed in pixels. At this point, an assumption may be risky so the user should be warned that the software did something that could be considered unexpected.






## Errors

Errors, unlike warnings, prevent the compiler from going any further. Basically, they stop the compilation and display a message in the output stream as well as the stack trace, which is handy for debugging. Because of this, errors should be thrown when there is no way for the program to keep running. When possible, try to work around the issue and display a warning instead.

As an example, let's say you build a getter function to access values from a specific map. You could throw an error if the requested key does not exist in the map.

<div class="code-block">
	<div class="code-block__wrapper" data-syntax="scss">
{% highlight scss %}
/// Z-indexes map, gathering all Z layers of the application
/// @access private
/// @type Map
/// @prop {String} key - Layer's name
/// @prop {Number} value - Z value mapped to the key
$z-indexes: (
	"modal": 5000,
	"dropdown": 4000,
	"default": 1,
	"below": -1,
);

/// Get a z-index value from a layer name
/// @access public
/// @param {String} $layer - Layer's name
/// @return {Number}
/// @require $z-indexes
@function z( $layer ) {
	@if ( not map-has-key( $z-indexes, $layer ) ) {
		@error "There is no layer named `#{$layer}` in $z-indexes. "
		 + "Layer should be one of #{map-keys( $z-indexes )}.";
	}

	@return map-get( $z-indexes, $layer );
}
{% endhighlight %}
	</div>
</div>











# Tools

What's nice about a CSS preprocessor as popular as Sass is that it comes with a whole ecosystem of frameworks, plugins, libraries and tools. After 8 years of existence, we are getting closer and closer to the point where [everything that can be written in Sass has been written in Sass](http://hugogiraudel.com/2014/10/27/rethinking-atwoods-law/).

However my advice would to be to lower the number of dependencies to the strict minimum. Managing dependencies is some sort of hell you don't want to be part of. Plus, there is little to no need for external dependencies when it comes to Sass.






## Compass

[Compass](http://compass-style.org/) is the main Sass framework out there. Developed by [Chris Eppstein](https://twitter.com/chriseppstein), one of the two core designers of Sass, I don't see it dramatically losing in popularity for a while, if you want my opinion.

Still, RP3 does not Compass anymore. All of the reasons we used to use Compass for (vendor prefixing, automatic sprite generation) can either be done more efficiently with other tools, or don't work very well in our applications.

### Further reading

* [Compass](http://compass-style.org/)
* [Sass Frameworks: Compass or Bourbon](http://www.sitepoint.com/compass-or-bourbon-sass-frameworks/)
* [Is Compass to Sass with jQuery is to JavaScript?](http://www.sitepoint.com/compass-sass-jquery-javascript/)






## Grid systems

Not using a grid system is not an option now that Responsive Web Design is all over the place. To make designs look consistent and solid across all sizes, we use some sort of grid to lay out the elements. To avoid having to code this grid work over and over again, some brilliant minds made theirs reusable.

RP3 currently uses [Susy](http://susy.oddbird.net/) for its primary grid framework. The advantages of Susy include not needing to include non-semantic "col" code in your markup, being able to define a custom grid for every project, and having a consistent API for creating grid systems across our projects. Additionally, although Susy uses floats and isolates for creating its grids, you can use its functions for determining column sizes and gutters to build flexbox layouts as well. Susy documentation also hints at flexbox being a natively-support option in the future.

### Further reading

* [Susy](http://susy.oddbird.net/)
* [Build Web Layouts Easily with Susy](http://css-tricks.com/build-web-layouts-easily-susy/)
* [A Complete Tutorial to Susy 2](http://www.zell-weekeat.com/susy2-tutorial/)
* [Sass Grids: From Neat to Susy](http://www.sitepoint.com/sass-grids-neat-susy/)
* [Bootstrap's Grid System vs Susy: a Comparison](http://www.sitepoint.com/bootstraps-grid-system-vs-susy-comparison/)
* [How to Use Susy: Superpowered Sass Grids](http://webdesign.tutsplus.com/tutorials/how-to-use-susy-superpowered-sass-grids--cms-22744)
* [A Creative Grid System with Sass and calc()](http://www.sitepoint.com/creative-grid-system-sass-calc/)






## SCSS-lint

Linting code is very important. Usually, following guidelines from a styleguide helps reducing the amount of code quality mistakes but nobody's perfect and there are always things to improve. So you could say that linting code is as important as commenting it.

[SCSS-lint](https://github.com/causes/scss-lint) is a tool to help you keep your SCSS files clean and readable. It is fully customisable and easy to integrate with your own tools.

Fortunately, SCSS-lint recommendations are very similar to those described in this document. In order to configure SCSS-lint according to Sass Guidelines, may I recommend the following setup:

{% highlight yaml %}
# For SCSS-Lint v0.31.0

linters:

	BangFormat:
	enabled: true
	space_before_bang: true
	space_after_bang: false

	BorderZero:
	enabled: true

	ColorKeyword:
	enabled: false

	Comment:
	enabled: false

	DebugStatement:
	enabled: true

	DeclarationOrder:
	enabled: true

	DuplicateProperty:
	enabled: false

	ElsePlacement:
	enabled: true
	style: same_line

	EmptyLineBetweenBlocks:
	enabled: true
	ignore_single_line_blocks: false

	EmptyRule:
	enabled: true

	FinalNewline:
	enabled: true
	present: true

	HexLength:
	enabled: true
	style: short

	HexNotation:
	enabled: true
	style: lowercase

	HexValidation:
	enabled: true

	IdSelector:
	enabled: true

	ImportPath:
	enabled: true
	leading_underscore: false
	filename_extension: false

	Indentation:
	enabled: true
	character: space
	width: 2

	LeadingZero:
	enabled: true
	style: exclude_zero

	MergeableSelector:
	enabled: false

	NameFormat:
	enabled: true
	convention: hyphenated_lowercase

	NestingDepth:
	enabled: true
	max_depth: 3

	PlaceholderInExtend:
	enabled: true

	PropertySortOrder:
	enabled: false

	PropertySpelling:
	enabled: true
	extra_properties: []

	QualifyingElement:
	enabled: true
	allow_element_with_attribute: false
	allow_element_with_class: false
	allow_element_with_id: false

	SelectorDepth:
	enabled: true
	max_depth: 3

	SelectorFormat:
	enabled: true
	convention: hyphenated_lowercase
	class_convention: '^(?:u|is|has)\-[a-z][a-zA-Z0-9]*$|^(?!u|is|has)[a-zA-Z][a-zA-Z0-9]*(?:\-[a-z][a-zA-Z0-9]*)?(?:\-\-[a-z][a-zA-Z0-9]*)?$'

	Shorthand:
	enabled: true

	SingleLinePerProperty:
	enabled: true
	allow_single_line_rule_sets: false

	SingleLinePerSelector:
	enabled: true

	SpaceAfterComma:
	enabled: true

	SpaceAfterPropertyColon:
	enabled: true
	style: one_space

	SpaceAfterPropertyName:
	enabled: true

	SpaceBeforeBrace:
	enabled: true
	style: space
	allow_single_line_padding: true

	SpaceBetweenParens:
	enabled: true
	spaces: 0

	StringQuotes:
	enabled: true
	style: single_quotes

	TrailingSemicolon:
	enabled: true

	TrailingZero:
	enabled: true

	UnnecessaryMantissa:
	enabled: true

	UnnecessaryParentReference:
	enabled: true

	UrlFormat:
	enabled: false

	UrlQuotes:
	enabled: true

	VendorPrefixes:
	enabled: true
	identifier_list: base
	include: []
	exclude: []

	ZeroUnit:
	enabled: true
{% endhighlight %}

<div class="note">
	<p>If you want to plug SCSS lint into your gulp build process, you will be pleased to know there is a gulp plugin for that called <a href="https://www.npmjs.com/package/gulp-scss-lint">gulp-scss-lint</a>.</p>
	<p>Also, if you are on the hunt for a neat application that works with SCSS-lint and the like, the guys at <a href="http://thoughtbot.com/">Thoughtbot</a> (Bourbon, Neat...) are working on <a href="https://houndci.com/">Hound</a>.</p>
</div>



### Further reading

* [SCSS-lint](https://github.com/causes/scss-lint)
* [Clean Up your Sass with SCSS-lint](http://blog.martinhujer.cz/clean-up-your-sass-with-scss-lint/)
* [Improving Sass code quality on theguardian.com](http://www.theguardian.com/info/developer-blog/2014/may/13/improving-sass-code-quality-on-theguardiancom)
* [An Auto-Enforceable SCSS Styleguide](http://davidtheclark.com/scss-lint-styleguide/)









# Too Long; Didn't read

To sum up, we want:

* Tab indents, set to 4 spaces;
* 80-characters wide lines;
* Properly written multi-line CSS;
* Meaningful use of whitespaces;
* Quoted strings (double quotes) & URLs;
* No trailing 0, mandatory leading 0;
* Calculations wrapped in parentheses;
* No magic numbers;
* Colors expressed in hexadecimal > RGB > HSL > keywords;
* Lists separated with commas;
* No trailing comma in lists (since they are inlined);
* Limit selector nesting where possible;
* Hyphen-delimited naming;
* Extensive comments;
* SassDoc-powered API comments;
* Limited usage of `@extend`;
* Simple mixins;
* As few loops as possible, no `@while`;
* Reduced number of dependencies;
* Meaningful use of warnings and errors.


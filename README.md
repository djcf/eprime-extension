E-Prime Assistant
=================

# Overview
The verb to 'be' and all related forms and inflections can be considered problematic from many perspectives including logical and analytic philosophy, the epistemological sciences and even psychology and therapy. A subset of the English language known as E' attempts to remove these logical contradictions and errors in order to encourage freer and clearer thought and communication. This Chromium browser extension highlights such forms in user submitted texts as if they were errors.

# Known Issues
This extension is ALPHA SOFTWARE. It DOES NOT WORK with iframe-based rich text editors. Critiques and further comment from the open-source community would be appreciated at this juncture especially about the iframe-based edit more editors. A fuller description of the problem is here: http://stackoverflow.com/questions/23858020/extension-content-scripts-in-designmode

The textarea is also buggy on stackexchange.

# Browser Support
The extension was designed in Opera and works in both Chrome and Opera desktop editions.

# Installation
Most users may drag the relevent packed browser extension into the browser extensions management page. The packed extensions live in the "extensions" directory in this repository. For Opera, use e-prime.nex. For Chrome, use e-prime.crx.

# Privacy Information
This extension requests access to all URLs in order to apply itself to any textareas and related forms including contenteditable elements that it finds. However, it does not communicate in any way with any process outside of your browser. The extension also applies specific optimisations to some sites so that the text area 

# Documentation and Further Information
Users are politely requested submit all problems, bugs and observations via the extension's support page (https://github.com/stormsaber/eprime-extension/issues) in a prompt and timely fashion.

Credits and Attributions
This author is greatful for the work on highlightable textareas carried out by Damien Sorel in his excellent JQuery.HighlightableTextArea library found here: https://github.com/mistic100/jquery-highlighttextarea. More information about the author can be found at their website http://www.strangeplanet.fr/ This author is also greatful to the #jquery IRC user innoCV for their help with caret location in contenteditable HTML elements, without which this extension would not have been possible.

# Licence
All code and icons are licenced under the GPLv2 except the libraries in ./lib. The JQuery.Caret library is distributed in good faith under the MIT Licence.
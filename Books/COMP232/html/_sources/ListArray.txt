.. _ListArray:

.. raw:: html

   <script>ODSA.SETTINGS.DISP_MOD_COMP = true;ODSA.SETTINGS.MODULE_NAME = "ListArray";ODSA.SETTINGS.MODULE_LONG_NAME = "Array-based Lists";ODSA.SETTINGS.MODULE_CHAPTER = "Linear Structures"; ODSA.SETTINGS.BUILD_DATE = "2017-11-27 23:03:57"; ODSA.SETTINGS.BUILD_CMAP = false;JSAV_OPTIONS['lang']='en';JSAV_EXERCISE_OPTIONS['code']='java_generic';</script>


.. |--| unicode:: U+2013   .. en dash
.. |---| unicode:: U+2014  .. em dash, trimming surrounding whitespace
   :trim:


.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: list ADT
   :satisfies: array-based list
   :topic: Lists

.. odsalink:: AV/List/alistCON.css

Array-Based List Implementation
===============================

Array-Based List Implementation
-------------------------------

Here is an implementation for the array-based list, named ``AList``.
``AList`` inherits from the :ref:`List ADT <ListADT>`,and so must implement all of the member functions of ``List``.

.. codeinclude:: Lists/AList
   :tag: AList

|

.. inlineav:: alistVarsCON ss
   :points: 0.0
   :required: False
   :threshold: 1.0
   :long_name: Array-based List Variables Slideshow
   :output: show

.. inlineav:: alistIntroCON ss
   :points: 0.0
   :required: False
   :threshold: 1.0
   :long_name: Array-based List Intro Slideshow
   :output: show


Insert
~~~~~~

Because the array-based list implementation is defined to store list
elements in contiguous cells of the array, the ``insert``, ``append``,
and ``remove`` methods must maintain this property.

.. inlineav:: alistInsertCON ss
   :points: 0.0
   :required: False
   :threshold: 1.0
   :long_name: Array-based List Insertion Slideshow
   :output: show


Insert Practice Exericse
~~~~~~~~~~~~~~~~~~~~~~~~

.. avembed:: Exercises/List/AlistInsertPRO.html ka
   :module: ListArray
   :points: 1
   :required: True
   :threshold: 3
   :exer_opts: JOP-lang=en&amp;JXOP-code=java_generic
   :long_name: Array-based List Insert Exercise


Append and Remove
-----------------

.. inlineav:: alistAppendCON ss
   :points: 0.0
   :required: False
   :threshold: 1.0
   :long_name: Array-based List Append Slideshow
   :output: show

Removing an element from the head of the list is
similar to insert in that all remaining elements  must shift toward
the head by one position to fill in the gap.
If we want to remove the element at position :math:`i`, then
:math:`n - i - 1` elements must shift toward the head, as shown in the
following slideshow. 

.. inlineav:: alistRemoveCON ss
   :points: 0.0
   :required: False
   :threshold: 1.0
   :long_name: Array-based List Remove
   :output: show

In the average case, insertion or removal each requires moving half
of the elements, which is :math:`\Theta(n)`.


Remove Practice Exericise
~~~~~~~~~~~~~~~~~~~~~~~~~

.. avembed:: Exercises/List/AlistRemovePRO.html ka
   :module: ListArray
   :points: 1
   :required: True
   :threshold: 4
   :exer_opts: JOP-lang=en&amp;JXOP-code=java_generic
   :long_name: Array-based List Remove Exercise

Aside from ``insert`` and ``remove``, the only other operations that
might require more than constant time are the constructor and
``clear``.
The other methods for Class ``AList`` simply
access the current list element or move the current position.
They all require :math:`\Theta(1)` time.


Array-based List Practice Questions
-----------------------------------

.. avembed:: Exercises/List/ALSumm.html ka
   :module: ListArray
   :points: 1
   :required: True
   :threshold: 3
   :exer_opts: JOP-lang=en&amp;JXOP-code=java_generic
   :long_name: Array-based List Summary

.. odsascript:: AV/List/alistVarsCON.js
.. odsascript:: AV/List/alistIntroCON.js
.. odsascript:: AV/List/alistInsertCON.js
.. odsascript:: AV/List/alistAppendCON.js
.. odsascript:: AV/List/alistRemoveCON.js

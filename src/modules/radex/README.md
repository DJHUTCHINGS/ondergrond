# Radical Exploder

See: www.RadicalExploder.com

For more information see this blog post:
https://medium.com/@davejh76/radical-exploder-an-online-application-for-helping-beginning-arabic-students-determine-word-roots-73a16b46a627

Radical Exploder is a tool for helping new students of Arabic identify the roots of Arabic words.

# Arabic 101

Most native Arabic words are formed from triliteral roots which are then modified by prefixes, suffixes, and infixes. Each individual letter in the root is called a "radical". There are also some quadraliteral roots with 4 radicals and there are a good number of triliteral roots which double the second and third radical producing a root which sometimes appears to only have 2 radicals, depending on how the root is being used or modified.

The most well-known of these prefixes is the "Al-" in words like "Al-Jazeera" or "Al-Qaeda". The "M" in the word "Muslim" is another of these. The root of the word "Muslim" is S-L-M. That S-L-M root is modified by the addition of a letter A, creating a verb rendered something like "aslama", which means "to submit". This form of the root is usually called Form 4. There are 9 very common forms of the triliteral roots plus a less common one used mostly in relation to colors, and another 3 or 4 extremely rare ones (quadraliteral roots usually only come in two forms).

All Arabic verbs can be modified to something called a verbal noun, which is like "baking" is to "to bake". In Form 4, the verbal noun is created by adding an A after the second and third radicals, and changing that first A to make an I sound, and thus we can the word "Islam".

All forms of the verb can also take the prefix "M", which for all the forms other than Form 1 is used along with some small vowel changes to create the active or passive participle, similar to the words "baker" and "baked" in English. From this we can see that the word "Muslim" is the active participle of the Form 4 of the root S-L-M.

Typically, Arabic dictionaries are organized alphabetically according to the root. To look up the word Muslim, you would need to recognize that S-L-M is the root and you would also need to understand that you need to look up the Form 4 definition, which can be tricky because Arabic words are typically not written with all the vowels. The word "Muslim" in Arabic is usually written in such as way that it could be hypothetically pronounced like any of the following: maslam, maslim, muslam, musallam, and musallim, all of which could hypothetically be grammatically correct words in Arabic. This isn't much of a problem for the actual word "Muslim", but for brand new students of Arabic, all of these factors make it extremely difficult to look up any word in a dictionary, which is of course something they may to do thousands of times over the course of their studies.

All of this presents a sort of "Catch-22"--it's difficult to learn Arabic if you can't look up words in a dictionary, and it is difficult to know how to look up words in a dictionary until you are already fairly proficient in Arabic.

This is where Radical Exploder helps.

In this app I have devised a system for checking all the letters of an Arabic term and displaying the letters most likely to be part of the root, as well as various comments explaining why that is. Each letter is given a score and then they are rendered in different sizes relative to each other based on that score. When the system works perfectly, what you should see are three very large letters while the rest of the letters will be small. Those three letters should be the root.

# Caveat: As should be obvious to anyone who speaks any language, sometimes the system will not work perfectly.

The system is intended to help students get better at peeling away the layers of affixes, not to definitively determine the root. If you just want to know the root of a word without an explanation of how to determine it yourself, see a tool such as http://thearamaster.com/.

# Tech

In terms of technology, the app is simple. It was built entirely in react and relies on no database. All processing is done in Javascript on the client side.

The most interesting thing about it is perhaps the main testing system.

As letters are added to the input, all white-space is removed. Then all characters that are not part of the main sub-block of the main Arabic Unicode block are filtered out entirely. Then, another "filter" removes diacritical marks. The Taa Marbutah is also removed and the aliphs with hamzahs or maddas are replaced by plain aliphs. The reason for doing this is to simplify the "tests". A future, more advanced version this app could very well incorporate all these characters.

For each character remaining in the stripped input, a score is assigned and then the term is passed to a series of tests I call the Basic Tests, the most important of which assigns each letter a score based on whether or not that letter is used for grammatical or morphological purposes. For example, the Arabic Q is never used for any grammatical purpose and is automatically considered a root character. As discussed above, however, the A, the L, and the M are all commonly used as prefixes, so they have a much lesser probability of being part of the root--although they may be. At this stage, a comment on each letter is displayed in the comments output.

After this is the Main Tests, which consist of two parts--the actual main test system, and a series of smaller tests to handle various unusual aspects of the language.

The main testing system is the heart of Radical Exploder and possibly the most interesting thing about it. The "test" uses a set up templates or models of standard modifications made to create Arabic words, where, if the input term matches that pattern, the scores of the "probably-not-root-letters" are decreased.
Examples of actual models are as follows:
M123 (example: Muslim)
ASLAM (example: Islam)
AL1A23 (example: Al-Qaeada)
AL12I3 (example: Al-Jazeera)
FSEST123 (example: فسيستعملوها: "So they will use them")
A model for the above term that tests for the suffixes looks like this:
xyzWHA

In order to run a test on a term, the input term must be at least as long as the model's number of characters.

The test models are input as English letters, but when the function is ran, all of those english letters are replaced by their Arabic equivalents and the numbers (which represent the radicals) are all converted to the letter X.

For each model, each letter from the model is compared with its equivalent in the input. If all the non-X characters match, the scores for each of those characters in the input is reduced by a certain percentage (all scores are based on percentages rather than fixed numbers to avoid negative scores for reasons addressed below). As with the Basic Tests, a comment associated with each model is then displayed explaining the reasoning.

Additional smaller tests can reduce or increase scores or produce comments for various other aspects of the language.

After all tests are run, the scores are modified to represent a reasonable range of font size. Each letter is displayed on screen at a font size representing its score relative to the scores of the other letters.

# Installation:

As mentioned above, this app is simple. Clone and start the server as you would any React App.

If you want to experiment with the models, they are located in tests/main-tests.js.

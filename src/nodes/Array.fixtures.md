# Array Formatting

## Joins elements with ", " when fits on one line

Before:

```ruby
[:one,:two,:three,:four]
```

After:

```ruby
[:one, :two, :three, :four]
```

## Joins elements with ",\n" when does not fit on one line

Before:

```ruby
[:onetwothreefourfive,:onetwothreefourfive,:onetwothreefourfive,:onetwothreefourfive]
```

After:

```ruby
[
  :onetwothreefourfive,
  :onetwothreefourfive,
  :onetwothreefourfive,
  :onetwothreefourfive
]
```

## Formats nested arrays when an element requires a break

Before:

```ruby
[:one, [:onetwothreefourfive,:onetwothreefourfive,:onetwothreefourfive,:onetwothreefourfive], :two]
```

After:

```ruby
[
  :one,
  [
    :onetwothreefourfive,
    :onetwothreefourfive,
    :onetwothreefourfive,
    :onetwothreefourfive
  ],
  :two
]
```

## Formats nested arrays when an element requires a break

Before:

```ruby
[:one, [:three, :four], :two]
```

After:

```ruby
[:one, [:three, :four], :two]
```

## Breaks the outer array first and allows nested arrays to remain one line

Before:

```ruby
[:onetwothreefourfive,:onetwothreefourfive,:onetwothreefourfive,:onetwothreefourfive, [:one, :two], [[:onetwothreefourfive,:onetwothreefourfive,:onetwothreefourfive,:onetwothreefourfive]]]
```

After:

```ruby
[
  :onetwothreefourfive,
  :onetwothreefourfive,
  :onetwothreefourfive,
  :onetwothreefourfive,
  [:one, :two],
  [
    [
      :onetwothreefourfive,
      :onetwothreefourfive,
      :onetwothreefourfive,
      :onetwothreefourfive
    ]
  ]
]
```

## Retains the % notation for %i and does not prefix with ":"

Before:

```ruby
%i(one two three)
```

After:

```ruby
%i(one two three)
```

## Retains the % notation for %I and does not prefix with ":"

Before:

```ruby
%I(one two three)
```

After:

```ruby
%I(one two three)
```

## Retains the % notation for %I and does not prefix with ":"

Before:

```ruby
%I(#{%w(hello)})
```

After:

```ruby
%I(#{%w(hello)})
```

## Retains the % notation for %w and does not quote contents

Before:

```ruby
%w(one two three)
```

After:

```ruby
%w(one two three)
```

## Retains the % notation for %W and does not quote contents

Before:

```ruby
%W(one two three)
```

After:

```ruby
%W(one two three)
```

## Retains the % notation for %W

Before:

```ruby
%W(one two three)
```

After:

```ruby
%W(one two three)
```

## Retains the % notation for %W and does not quote

Before:

```ruby
%W(#{%w(hello)})
```

After:

```ruby
%W(#{%w(hello)})
```

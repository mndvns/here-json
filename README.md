# here-json

A handy stream to JSON decoder.

## Usage

Via `--help`:

    Usage: here-json [options] < stream > json

    Options:

      -h, --help     output usage information
      -V, --version  output the version number
      -p, --pretty   pretty print output

## Examples

yaml:

    λ : here-json <<EOF
    heredoc> ---
    heredoc> - Vi is a subset of evil.
    heredoc> - The difference between theory and practice is smaller in theory than in practice.
    heredoc> - "There are only 3 numbers of interest to a computer scientist: 1, 0 and infinity."
    heredoc> EOF

    # yields...

    ["Vi is a subset of evil.","The difference between theory and practice is smaller in theory than in practice.","There are only 3 numbers of interest to a computer scientist: 1, 0 and infinity."]%

ini:

    λ : here-json <<EOF
    heredoc> [what]
    heredoc> in = 10
    heredoc> the = 11
    heredoc> world = is this format
    heredoc> EOF

    # yields...

    {"what":{"in":"10","the":"10","world":"is this format"}}%

or just pretty json:

    λ : here-json --pretty <<< '{foo: {bar: {baz: [0,1,2,3,{bar:['okay','that','is','enough']}]}}}'

    # yields...

    {
      "foo": {
        "bar": {
          "baz": [
            0,
            1,
            2,
            3,
            {
              "bar": [
                "okay",
                "that",
                "is",
                "enough"
              ]
            }
          ]
        }
      }
    }

whatever you want, really.

    λ : here-json -p < .env | sed 's,_,-,' | tr 'A-Z' 'a-z'

    # yields...

    {
      "node-env": "development",
      "api-url": "https://api.walkthrough.com",
      "oauth-client_id": "walkthrough",
      "oauth-client_secret": "this-is-a-secret"
    }

## Test

    git clone https://github.com/mndvns/here-json.git
    npm i --dev
    npm test

## License

MIT

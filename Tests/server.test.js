const player = require("../Models/Player");
const repo = require("../Repositories/PlayerRepository");

var testPlayer;
var testRepo;

describe("Player", () => {
  beforeEach(() => {
    testPlayer = new player.Player("asdfggh");
  });

  test("AddPoint method exists", () => {
    expect(typeof testPlayer.AddPoint).toBe("function");
  });

  test("AddPoint works", () => {
    testPlayer.AddPoint(1);
    expect(testPlayer.point).toBe(1);
  });

  test("GetSocketId() is a function", () => {
    expect(typeof testPlayer.GetSocketId).toBe("function");
  });

  test("GetSocketId() return with good value", () => {
    expect(testPlayer.GetSocketId()).toBe("asdfggh");
  });

  test.each`
    add   | expected
    ${1}  | ${1}
    ${0}  | ${0}
    ${-1} | ${0}
  `("AddPoint($add) add and point is $expected", ({ add, expected }) => {
    testPlayer.AddPoint(add);
    expect(testPlayer.point).toBe(expected);
  });
});

describe("PlayerRepository", () => {
  beforeEach(() => {
    testRepo = new repo.PlayerRepository();
  });
  test("AddPlayer() is exists", () => {
    expect(typeof testRepo.AddPlayer).toBe("function");
  });
  test.each`
    input                          | output
    ${new player.Player("asdfgh")} | ${1}
    ${1}                           | ${0}
    ${"player"}                    | ${0}
  `("AddPlayer($input) length is $output", ({ input, output }) => {
    testRepo.AddPlayer(input);
    expect(testRepo.GetPlayers().length).toBe(output);
  });

  test("RemovePlayerById() exists", () => {
    expect(typeof testRepo.RemovePlayerById).toBe("function");
  });

  test.each`
    add                            | remove      | expected
    ${new player.Player("asdfgh")} | ${"asdfgh"} | ${0}
    ${new player.Player("asdfgh")} | ${""}       | ${1}
  `(
    "RemovePlayerById($remove) removes and expected length is $expected",
    ({ add, remove, expected }) => {
      testRepo.AddPlayer(add);
      testRepo.RemovePlayerById(remove);
      expect(testRepo.GetPlayers().length).toBe(expected);
    }
  );
  test("GetPlayers() exists", () => {
    expect(typeof testRepo.GetPlayers).toBe("function");
  });
  test.each`
    add                            | expected
    ${new player.Player("asdfgh")} | ${1}
    ${""}                          | ${0}
  `("GetPlayers() length is $expected", ({ add, remove, expected }) => {
    testRepo.AddPlayer(add);
    testRepo.RemovePlayerById(remove);
    expect(testRepo.GetPlayers().length).toBe(expected);
  });

  test("FindPlayerById() exists", () => {
    expect(typeof testRepo.FindPlayerById).toBe("function");
  });

  test.each`
    add                            | search      | expected
    ${new player.Player("asdfgh")} | ${"asdfgh"} | ${new player.Player("asdfgh")}
    ${new player.Player("asdfgh")} | ${""}       | ${undefined}
  `(
    "FindPlayerById($search) length is $expected",
    ({ add, search, expected }) => {
      testRepo.AddPlayer(add);
      //testRepo.FindPlayerById(search);
      expect(testRepo.FindPlayerById(search)).toStrictEqual(expected);
    }
  );
});
